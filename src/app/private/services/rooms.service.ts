import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Room } from '../models/room.model';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private htpp: HttpClient) {}

  // login(email: string, password: string): Observable<RespAuth> {
  //   return this.htpp.post<RespAuth>(`${URL}/auth`, { email, password });
  // }

  getRooms() {
    return this.htpp.get<{ ok: boolean; rooms: Room[] }>(`${URL}/rooms`);
  }
}
