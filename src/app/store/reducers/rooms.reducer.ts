import { createReducer, on } from '@ngrx/store';
import { Room } from 'src/app/private/models/room.model';
import {
  loadRooms,
  loadRoomsSuccess,
  selectRoom,
  unSelectRoom,
} from '../actions/rooms/rooms.actions';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface RoomsState {
  rooms: Room[] | null;
  roomSelected: Room | null;
  error: any;
}

export const roomInitialState: RoomsState = {
  rooms: [],
  roomSelected: null,
  error: null,
};

// eslint-disable-next-line no-underscore-dangle
const _roomsReducer = createReducer(
  roomInitialState,
  on(loadRooms, (state) => ({ ...state })),
  on(loadRoomsSuccess, (state, { rooms }) => ({ ...state, rooms })),
  on(selectRoom, (state, { roomSelected }) => ({ ...state, roomSelected })),
  on(unSelectRoom, (state) => ({ ...state, roomSelected: null }))
);

export const roomsReducer = (state, action) => _roomsReducer(state, action);
