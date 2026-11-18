import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { Municipio } from './models/municipio';

@Injectable({ providedIn: 'root' })
export class MunicipioService {
  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${API_BASE_URL}/municipios`);
  }
}
