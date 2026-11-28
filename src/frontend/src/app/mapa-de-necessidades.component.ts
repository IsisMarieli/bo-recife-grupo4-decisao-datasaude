import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MapaMunicipiosComponent } from './mapa-municipios.component';
import { Municipio } from './models/municipio';
import { MunicipioService } from './municipio.service';
import { rotuloPrioridade } from './prioridade';

@Component({
  selector: 'app-mapa-de-necessidades',
  standalone: true,
  imports: [CommonModule, RouterLink, MapaMunicipiosComponent],
  templateUrl: './mapa-de-necessidades.component.html',
  styleUrl: './mapa-de-necessidades.component.css',
})
export class MapaDeNecessidadesComponent implements OnInit {
  municipios: Municipio[] = [];
  carregando = true;
  erro = false;
  readonly rotuloPrioridade = rotuloPrioridade;

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
}
