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
    }).subscribe({
      next: ({ municipios, alertas }) => {
        this.municipios = municipios;
        this.alertas = alertas;
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

  nomeMunicipio(municipioId: number): string {
    return this.municipios.find((m) => m.id === municipioId)?.nome ?? `Município #${municipioId}`;
  }
}
