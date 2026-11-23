import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Municipio } from './models/municipio';
import { MunicipioService } from './municipio.service';

@Component({
  selector: 'app-mapa-de-necessidades',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mapa-de-necessidades.component.html',
  styleUrl: './mapa-de-necessidades.component.css',
})
export class MapaDeNecessidadesComponent implements OnInit {
  municipios: Municipio[] = [];
  carregando = true;
  erro = false;

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
