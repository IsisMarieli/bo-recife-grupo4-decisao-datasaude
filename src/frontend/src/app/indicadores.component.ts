import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

import { IndicadorService } from './indicador.service';
import { Indicador } from './models/indicador';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.css',
})
export class IndicadoresComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input({ required: true }) municipioId!: number;
  @Input() municipioNome = '';

  indicadores: Indicador[] = [];
  carregando = true;
  erro = false;

  @ViewChildren('grafico') private canvases!: QueryList<ElementRef<HTMLCanvasElement>>;
  private graficos: Chart[] = [];

  constructor(private readonly indicadorService: IndicadorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['municipioId']) {
      this.carregar();
    }
  }

  ngAfterViewInit(): void {
    this.canvases.changes.subscribe(() => this.desenharGraficos());
  }

  ngOnDestroy(): void {
    this.destruirGraficos();
  }

  private carregar(): void {
    this.carregando = true;
    this.erro = false;
    this.indicadores = [];
    this.indicadorService.listarPorMunicipio(this.municipioId).subscribe({
      next: (indicadores) => {
        this.indicadores = indicadores;
        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  private desenharGraficos(): void {
    this.destruirGraficos();
    this.canvases.forEach((canvasRef, index) => {
      const indicador = this.indicadores[index];
      if (!indicador) {
        return;
      }
      const grafico = new Chart(canvasRef.nativeElement, {
        type: 'line',
        data: {
          labels: indicador.valores.map((v) => v.periodo),
          datasets: [
            {
              label: indicador.nome,
              data: indicador.valores.map((v) => v.valor),
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: false } },
        },
      });
      this.graficos.push(grafico);
    });
  }

  private destruirGraficos(): void {
    this.graficos.forEach((grafico) => grafico.destroy());
    this.graficos = [];
  }
}
