import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { Indicador } from './models/indicador';
import { VariacaoIndicador } from './models/variacao-indicador';

@Injectable({ providedIn: 'root' })
export class IndicadorService {
  constructor(private readonly http: HttpClient) {}

  listarPorMunicipio(municipioId: number): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(`${API_BASE_URL}/municipios/${municipioId}/indicadores`);
  }

  variacao(opcoes?: { municipioId?: number | null; meses?: number }): Observable<VariacaoIndicador[]> {
    let params = new HttpParams();
    if (opcoes?.municipioId != null) {
      params = params.set('municipio_id', opcoes.municipioId);
    }
    if (opcoes?.meses != null) {
      params = params.set('meses', opcoes.meses);
    }
    return this.http.get<VariacaoIndicador[]>(`${API_BASE_URL}/indicadores/variacao`, { params });
  }
}
