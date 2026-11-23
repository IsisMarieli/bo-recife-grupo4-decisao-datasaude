import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicadoresComponent } from './indicadores.component';
import { Municipio } from './models/municipio';
import { MunicipioService } from './municipio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IndicadoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  municipios: Municipio[] = [];
  carregando = true;
  erro = false;
  municipioSelecionado: Municipio | null = null;

  constructor(private readonly municipioService: MunicipioService) {}

  ngOnInit(): void {
    this.municipioService.listar().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  selecionar(municipio: Municipio): void {
    this.municipioSelecionado = municipio;
  }
}
