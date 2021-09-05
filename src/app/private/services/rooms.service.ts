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

  addRoom(room: Room): Observable<{ ok: boolean; msg: string }> {
    return this.htpp.post<{ ok: boolean; msg: string }>(`${URL}/rooms`, room);
  }

  editRoom(id: string, room: Room): Observable<{ ok: boolean; msg: string }> {
    return this.htpp.put<{ ok: boolean; msg: string }>(
      `${URL}/rooms/${id}`,
      room
    );
  }

  getRooms() {
    return this.htpp.get<{ ok: boolean; rooms: Room[] }>(`${URL}/rooms`);
  }
}
