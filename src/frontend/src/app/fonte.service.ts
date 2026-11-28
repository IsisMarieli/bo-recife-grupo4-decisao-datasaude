import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { FonteDados } from './models/fonte';

@Injectable({ providedIn: 'root' })
export class FonteService {
  constructor(private readonly http: HttpClient) {}

  listar(): Observable<FonteDados[]> {
    return this.http.get<FonteDados[]>(`${API_BASE_URL}/fontes`);
  }
}
