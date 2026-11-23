import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { Indicador } from './models/indicador';

@Injectable({ providedIn: 'root' })
export class IndicadorService {
  constructor(private readonly http: HttpClient) {}

  listarPorMunicipio(municipioId: number): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(`${API_BASE_URL}/municipios/${municipioId}/indicadores`);
  }
}
