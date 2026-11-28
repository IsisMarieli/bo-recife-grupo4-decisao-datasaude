import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AlertaService } from './alerta.service';
import { FonteService } from './fonte.service';
import { StatusService } from './status.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ultimaAtualizacao: string | null = null;
  alertasAtivos = 0;
  versao: string | null = null;

  constructor(
    private readonly fonteService: FonteService,
    private readonly alertaService: AlertaService,
    private readonly statusService: StatusService,
  ) {}

  ngOnInit(): void {
    forkJoin({
      fontes: this.fonteService.listar(),
      alertas: this.alertaService.listar(),
      status: this.statusService.obter(),
    }).subscribe({
      next: ({ fontes, alertas, status }) => {
        const data = fontes.find((f) => f.data_ultima_atualizacao)?.data_ultima_atualizacao;
        this.ultimaAtualizacao = data
          ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
              new Date(`${data}T00:00:00`),
            )
          : null;
        this.alertasAtivos = alertas.length;
        this.versao = status.versao;
      },
      error: () => {
        this.ultimaAtualizacao = null;
        this.alertasAtivos = 0;
      },
    });
  }
}
