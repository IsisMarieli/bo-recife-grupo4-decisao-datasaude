import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { Alerta } from './models/alerta';

@Injectable({ providedIn: 'root' })
export class AlertaService {
  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${API_BASE_URL}/alertas`);
  }
}
