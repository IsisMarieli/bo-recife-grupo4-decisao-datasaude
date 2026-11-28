import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { forkJoin } from 'rxjs';

import { Municipio } from './models/municipio';
import { MunicipioService } from './municipio.service';
import { COR_SEM_DADOS, corPrioridade, rotuloPrioridade } from './prioridade';

interface FeatureMunicipioIbge {
  type: string;
  properties: { codarea: string };
  geometry: GeoJSON.Geometry;
}

interface MalhaMunicipiosIbge {
  type: string;
  features: FeatureMunicipioIbge[];
}

// Fernando de Noronha é parte de PE, mas fica ~350 km da costa — incluí-lo no
// cálculo de enquadramento força um zoom bem mais afastado do que o útil para
// visualizar os municípios do continente. Ele continua sendo desenhado no
// mapa normalmente, só não entra na conta do enquadramento inicial.
const CODIGO_FERNANDO_DE_NORONHA = '2605459';

/** Mapa interativo (Leaflet) dos municípios de PE, reaproveitado pela tela
 * Mapa de Necessidades (tamanho cheio) e pelo cartão de mapa da Visão Geral
 * (tamanho compacto). */
@Component({
  selector: 'app-mapa-municipios',
  standalone: true,
  template: `<div #mapa class="mapa-municipios"></div>`,
  styles: [
    `
      :host,
      .mapa-municipios {
        display: block;
        width: 100%;
        height: 100%;
      }

      :host ::ng-deep .leaflet-container {
        background: #f3f6f4;
      }
    `,
  ],
})
export class MapaMunicipiosComponent implements OnInit, AfterViewInit {
  @ViewChild('mapa') private mapaRef!: ElementRef<HTMLDivElement>;
  @Output() carregado = new EventEmitter<void>();
  @Output() falhou = new EventEmitter<void>();

  private mapa?: L.Map;
  private malha?: MalhaMunicipiosIbge;
  private viewPronta = false;
  private erro = false;

  constructor(
    private readonly municipioService: MunicipioService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    forkJoin({
      municipios: this.municipioService.listar(),
      malha: this.http.get<MalhaMunicipiosIbge>('/pe-municipios.geojson'),
    }).subscribe({
      next: ({ municipios, malha }) => {
        this.malha = malha;
        this.tentarDesenharMapa(municipios);
        this.carregado.emit();
      },
      error: () => {
        this.erro = true;
        this.falhou.emit();
      },
    });
  }

  ngAfterViewInit(): void {
    this.viewPronta = true;
  }

  private tentarDesenharMapa(municipios: Municipio[]): void {
    if (!this.viewPronta || !this.malha || this.erro) {
      // a view do Angular ainda não está pronta no primeiro tick; tenta de novo
      // no próximo frame, já que ngAfterViewInit roda logo em seguida.
      setTimeout(() => this.tentarDesenharMapa(municipios), 0);
      return;
    }

    this.mapa = L.map(this.mapaRef.nativeElement, {
      scrollWheelZoom: true,
      zoomSnap: 0.25,
      zoomControl: false,
      minZoom: 6,
      maxZoom: 11,
      attributionControl: false,
      crs: L.CRS.EPSG3857,
    });
    L.control.zoom({ position: 'topright' }).addTo(this.mapa);
    L.control.attribution({ prefix: false, position: 'bottomright' }).addAttribution('Malha: IBGE').addTo(this.mapa);

    const porCodigoIbge = new Map(municipios.map((m) => [m.codigo_ibge, m]));

    L.geoJSON(this.malha as unknown as GeoJSON.GeoJsonObject, {
      style: (feature?: GeoJSON.Feature) => {
        const municipio = porCodigoIbge.get(feature?.properties?.['codarea']);
        return {
          color: '#ffffff',
          weight: municipio ? 1 : 0.5,
          fillColor: municipio ? corPrioridade(municipio.prioridade?.nivel) : COR_SEM_DADOS,
          fillOpacity: municipio ? 0.8 : 0.3,
        };
      },
      onEachFeature: (feature: GeoJSON.Feature, layer: L.Layer) => {
        const municipio = porCodigoIbge.get(feature?.properties?.['codarea']);
        const path = layer as L.Path;

        if (municipio) {
          layer.bindTooltip(
            `<strong>${municipio.nome}</strong><br>Prioridade: ${rotuloPrioridade(municipio.prioridade?.nivel)}`,
          );
          layer.on('click', () => this.router.navigate(['/indicadores', municipio.id]));
          layer.on('mouseover', () => path.setStyle({ fillOpacity: 1, weight: 2 }));
          layer.on('mouseout', () => path.setStyle({ fillOpacity: 0.8, weight: 1 }));
        } else {
          layer.bindTooltip('Sem dados disponíveis para este município.');
        }
      },
    }).addTo(this.mapa);

    const continente: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: this.malha.features.filter(
        (f) => f.properties.codarea !== CODIGO_FERNANDO_DE_NORONHA,
      ) as unknown as GeoJSON.Feature[],
    };
    this.mapa.fitBounds(L.geoJSON(continente).getBounds(), { padding: [12, 12] });

    // o card pode ainda estar com altura 0 no primeiro layout; garante o
    // tamanho correto assim que o container estabiliza.
    setTimeout(() => this.mapa?.invalidateSize(), 50);
  }
}
