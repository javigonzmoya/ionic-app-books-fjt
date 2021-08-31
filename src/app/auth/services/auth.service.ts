import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqRegister } from 'src/app/core/models/reqRegister.model';
import { RespAuth } from 'src/app/core/models/respAuth.model';
import { environment } from 'src/environments/environment';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private htpp: HttpClient) {}

  login(email: string, password: string): Observable<RespAuth> {
    return this.htpp.post<RespAuth>(`${URL}/auth`, { email, password });
  }

  register(data: ReqRegister): Observable<RespAuth> {
    return this.htpp.post<RespAuth>(`${URL}/auth/new`, data);
  }
  rewToken(): Observable<RespAuth> {
    return this.htpp.get<RespAuth>(`${URL}/auth/renew`);
  }
}
