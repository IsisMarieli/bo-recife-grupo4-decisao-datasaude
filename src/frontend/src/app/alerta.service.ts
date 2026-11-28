import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { Alerta } from './models/alerta';

@Injectable({ providedIn: 'root' })
export class AlertaService {
  constructor(private readonly http: HttpClient) {}

  listar(municipioId?: number | null): Observable<Alerta[]> {
    let params = new HttpParams();
    if (municipioId != null) {
      params = params.set('municipio_id', municipioId);
    }
    return this.http.get<Alerta[]>(`${API_BASE_URL}/alertas`, { params });
  }
}
