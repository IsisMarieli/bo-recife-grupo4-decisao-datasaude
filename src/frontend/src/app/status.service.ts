import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-config';
import { Status } from './models/status';

@Injectable({ providedIn: 'root' })
export class StatusService {
  constructor(private readonly http: HttpClient) {}

  obter(): Observable<Status> {
    return this.http.get<Status>(`${API_BASE_URL}/`);
  }
}
