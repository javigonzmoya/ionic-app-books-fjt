import { Room } from './room.model';

export interface RoomsResponse {
  ok: boolean;
  msg?: string;
  rooms?: Room[];
}
