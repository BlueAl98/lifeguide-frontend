import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { handleErrorsLocally } from '../../../shared/data-access/handled-errors';
import { RegisterRequest, RegisterResponse } from '../domain/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly http = inject(HttpClient);

  register(request: RegisterRequest): Observable<RegisterResponse> {
    // 400/409 are shown inline by the register form; anything else goes to the global dialog.
    return this.http.post<RegisterResponse>('/api/register', request, {
      context: handleErrorsLocally(400, 409),
    });
  }
}
