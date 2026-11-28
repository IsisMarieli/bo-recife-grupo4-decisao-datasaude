import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

@Component({
  selector: 'app-mapa-de-necessidades',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mapa-de-necessidades.component.html',
  styleUrl: './mapa-de-necessidades.component.css',
})
export class MapaDeNecessidadesComponent implements OnInit, AfterViewInit {
  @ViewChild('mapa') private mapaRef!: ElementRef<HTMLDivElement>;

  municipios: Municipio[] = [];
  carregando = true;
  erro = false;
  readonly rotuloPrioridade = rotuloPrioridade;

  private mapa?: L.Map;
  private malha?: MalhaMunicipiosIbge;
  private viewPronta = false;

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
        this.municipios = municipios;
        this.malha = malha;
        this.carregando = false;
        this.tentarDesenharMapa();
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this.viewPronta = true;
    this.tentarDesenharMapa();
  }

  private tentarDesenharMapa(): void {
    if (!this.viewPronta || !this.malha || this.erro) {
      return;
    }

    this.mapa = L.map(this.mapaRef.nativeElement, { scrollWheelZoom: false, zoomSnap: 0.25 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 12,
    }).addTo(this.mapa);

    const porCodigoIbge = new Map(this.municipios.map((m) => [m.codigo_ibge, m]));

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
  }
}
