import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AlertaService } from './alerta.service';
import { IndicadorService } from './indicador.service';
import { MapaMunicipiosComponent } from './mapa-municipios.component';
import { Alerta } from './models/alerta';
import { Municipio } from './models/municipio';
import { VariacaoIndicador } from './models/variacao-indicador';
import { MunicipioService } from './municipio.service';
import { corPrioridade, rotuloPrioridade } from './prioridade';

const PERIODO_PADRAO_MESES = 6;

@Component({
  selector: 'app-visao-geral',
  standalone: true,
  imports: [CommonModule, RouterLink, MapaMunicipiosComponent],
  templateUrl: './visao-geral.component.html',
  styleUrl: './visao-geral.component.css',
})
export class VisaoGeralComponent implements OnInit {
  municipios: Municipio[] = [];
  alertas: Alerta[] = [];
  municipioFoco: Municipio | null = null;
  variacoes: VariacaoIndicador[] = [];
  carregando = true;
  erro = false;

  territorioSelecionado: number | null = null;
  periodoSelecionado = PERIODO_PADRAO_MESES;

  readonly corPrioridade = corPrioridade;
  readonly rotuloPrioridade = rotuloPrioridade;

  constructor(
    private readonly municipioService: MunicipioService,
    private readonly alertaService: AlertaService,
    private readonly indicadorService: IndicadorService,
  ) {}

  ngOnInit(): void {
    this.municipioService.listar().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        this.carregarFiltrados();
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  private carregarFiltrados(): void {
    this.carregando = true;
    this.erro = false;

    const municipioFoco$ = this.territorioSelecionado
      ? this.municipioService.obter(this.territorioSelecionado)
      : this.municipioService.regiaoPadrao();

    forkJoin({
      alertas: this.alertaService.listar(this.territorioSelecionado),
      municipioFoco: municipioFoco$,
      variacoes: this.indicadorService.variacao({
        municipioId: this.territorioSelecionado,
        meses: this.periodoSelecionado,
      }),
    }).subscribe({
      next: ({ alertas, municipioFoco, variacoes }) => {
        this.alertas = alertas;
        this.municipioFoco = municipioFoco;
        this.variacoes = variacoes;
        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  get municipiosFiltrados(): Municipio[] {
    return this.territorioSelecionado
      ? this.municipios.filter((m) => m.id === this.territorioSelecionado)
      : this.municipios;
  }

  get totalMunicipios(): number {
    return this.municipiosFiltrados.length;
  }

  get totalPrioridadeAlta(): number {
    return this.municipiosFiltrados.filter((m) => m.prioridade?.nivel === 'alta').length;
  }

  get populacaoTotal(): number {
    return this.municipiosFiltrados.reduce((soma, m) => soma + (m.populacao ?? 0), 0);
  }

  get filtrosAtivos(): boolean {
    return this.territorioSelecionado !== null || this.periodoSelecionado !== PERIODO_PADRAO_MESES;
  }

  get competencia(): string {
    const periodo = this.variacoes[0]?.periodo_atual;
    if (!periodo) {
      return '';
    }
    const [ano, mes] = periodo.split('-').map(Number);
    const nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(ano, mes - 1, 1));
    const nomeMesCapitalizado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
    return `Competência: ${nomeMesCapitalizado} de ${ano}`;
  }

  get alertaDestaque(): Alerta | null {
    if (this.alertas.length === 0) {
      return null;
    }
    return this.alertas.find((a) => a.gravidade === 'alta') ?? this.alertas[0];
  }

  municipioDoAlerta(municipioId: number): Municipio | undefined {
    return this.municipios.find((m) => m.id === municipioId);
  }

  numero(indice: number): string {
    return String(indice + 1).padStart(2, '0');
  }

  formatarNumero(n: number | null | undefined): string {
    return n == null ? '—' : new Intl.NumberFormat('pt-BR').format(n);
  }

  larguraBarra(variacaoPercentual: number): number {
    return Math.min(Math.abs(variacaoPercentual) * 10, 100);
  }

  aoMudarTerritorio(valor: string): void {
    this.territorioSelecionado = valor ? Number(valor) : null;
    this.carregarFiltrados();
  }

  aoMudarPeriodo(valor: string): void {
    this.periodoSelecionado = Number(valor);
    this.carregarFiltrados();
  }

  limparFiltros(): void {
    this.territorioSelecionado = null;
    this.periodoSelecionado = PERIODO_PADRAO_MESES;
    this.carregarFiltrados();
  }

  baixarVariacoes(): void {
    const cabecalho = 'Indicador;Periodo;Valor medio;Variacao (%)\n';
    const linhas = this.variacoes
      .map(
        (v) =>
          `${v.nome_curto ?? v.nome};${v.periodo_atual};${v.valor_medio_atual};${v.variacao_percentual}`,
      )
      .join('\n');
    const blob = new Blob([cabecalho + linhas], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'variacao-indicadores.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
