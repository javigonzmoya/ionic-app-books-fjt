import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../models/room.model';
import { RoomsResponse } from '../models/rooms.interface';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private htpp: HttpClient) {}

  addRoom(room: Room): Observable<RoomsResponse> {
    return this.htpp.post<RoomsResponse>(`${URL}/rooms`, room);
  }

  editRoom(id: string, room: Room): Observable<RoomsResponse> {
    return this.htpp.put<RoomsResponse>(`${URL}/rooms/${id}`, room);
  }

  deleteRoom(id: string): Observable<RoomsResponse> {
    return this.htpp.delete<RoomsResponse>(`${URL}/rooms/${id}`);
  }

  getRooms(): Observable<RoomsResponse> {
    return this.htpp.get<RoomsResponse>(`${URL}/rooms`);
  }
}
