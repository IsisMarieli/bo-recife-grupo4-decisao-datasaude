import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AlertaService } from './alerta.service';
import { Alerta } from './models/alerta';
import { Municipio } from './models/municipio';
import { MunicipioService } from './municipio.service';

@Component({
  selector: 'app-visao-geral',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './visao-geral.component.html',
  styleUrl: './visao-geral.component.css',
})
export class VisaoGeralComponent implements OnInit {
  municipios: Municipio[] = [];
  alertas: Alerta[] = [];
  municipioFoco: Municipio | null = null;
  carregando = true;
  erro = false;

  constructor(
    private readonly municipioService: MunicipioService,
    private readonly alertaService: AlertaService,
  ) {}

  ngOnInit(): void {
    forkJoin({
      municipios: this.municipioService.listar(),
      alertas: this.alertaService.listar(),
      municipioFoco: this.municipioService.regiaoPadrao(),
    }).subscribe({
      next: ({ municipios, alertas, municipioFoco }) => {
        this.municipios = municipios;
        this.alertas = alertas;
        this.municipioFoco = municipioFoco;
        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  get totalMunicipios(): number {
    return this.municipios.length;
  }

  get totalPrioridadeAlta(): number {
    return this.municipios.filter((m) => m.prioridade?.nivel === 'alta').length;
  }

  get totalPrioridadeMedia(): number {
    return this.municipios.filter((m) => m.prioridade?.nivel === 'media').length;
  }

  private readonly CORES_PRIORIDADE: Record<string, string> = {
    alta: '#B00020',
    media: '#9A6400',
    baixa: '#1A7A38',
  };

  private readonly ROTULOS_PRIORIDADE: Record<string, string> = {
    alta: 'Alta',
    media: 'Média',
    baixa: 'Baixa',
  };

  municipioDoAlerta(municipioId: number): Municipio | undefined {
    return this.municipios.find((m) => m.id === municipioId);
  }

  numero(indice: number): string {
    return String(indice + 1).padStart(2, '0');
  }

  corPrioridade(gravidade: string): string {
    return this.CORES_PRIORIDADE[gravidade] ?? '#555';
  }

  rotuloPrioridade(gravidade: string): string {
    return this.ROTULOS_PRIORIDADE[gravidade] ?? gravidade;
  }

  formatarNumero(n: number | null | undefined): string {
    return n == null ? '—' : new Intl.NumberFormat('pt-BR').format(n);
  }
}
