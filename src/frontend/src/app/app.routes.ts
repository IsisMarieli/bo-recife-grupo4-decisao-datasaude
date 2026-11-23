import { Routes } from '@angular/router';

import { IndicadoresPageComponent } from './indicadores-page.component';
import { MapaDeNecessidadesComponent } from './mapa-de-necessidades.component';
import { PriorizacaoComponent } from './priorizacao.component';
import { VisaoGeralComponent } from './visao-geral.component';

export const routes: Routes = [
  { path: '', redirectTo: 'visao-geral', pathMatch: 'full' },
  { path: 'visao-geral', component: VisaoGeralComponent, title: 'Visão Geral — Saúde Estratégica' },
  {
    path: 'mapa-de-necessidades',
    component: MapaDeNecessidadesComponent,
    title: 'Mapa de Necessidades — Saúde Estratégica',
  },
  {
    path: 'indicadores',
    component: IndicadoresPageComponent,
    title: 'Indicadores de Saúde — Saúde Estratégica',
  },
  {
    path: 'indicadores/:municipioId',
    component: IndicadoresPageComponent,
    title: 'Indicadores de Saúde — Saúde Estratégica',
  },
  { path: 'priorizacao', component: PriorizacaoComponent, title: 'Priorização — Saúde Estratégica' },
  { path: '**', redirectTo: 'visao-geral' },
];
