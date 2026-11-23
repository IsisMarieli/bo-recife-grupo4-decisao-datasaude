import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IndicadoresComponent } from './indicadores.component';
import { Municipio } from './models/municipio';
import { MunicipioService } from './municipio.service';

@Component({
  selector: 'app-indicadores-page',
  standalone: true,
  imports: [CommonModule, IndicadoresComponent],
  templateUrl: './indicadores-page.component.html',
  styleUrl: './indicadores-page.component.css',
})
export class IndicadoresPageComponent implements OnInit {
  municipios: Municipio[] = [];
  municipioSelecionado: Municipio | null = null;
  carregando = true;
  erro = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly municipioService: MunicipioService,
  ) {}

  ngOnInit(): void {
    this.municipioService.listar().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        this.carregando = false;
        const idParam = this.route.snapshot.paramMap.get('municipioId');
        if (idParam) {
          this.municipioSelecionado = municipios.find((m) => m.id === Number(idParam)) ?? null;
        }
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      },
    });
  }

  selecionar(idTexto: string): void {
    const id = Number(idTexto);
    this.municipioSelecionado = this.municipios.find((m) => m.id === id) ?? null;
    this.router.navigate(['/indicadores', id]);
  }
}
