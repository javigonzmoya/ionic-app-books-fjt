import { Room } from './room.interface';

export interface RoomsResponse {
  ok: boolean;
  msg?: string;
  rooms?: Room[];
  room: Room;
}
