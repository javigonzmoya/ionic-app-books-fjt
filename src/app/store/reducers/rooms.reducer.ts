import { createReducer, on } from '@ngrx/store';
import { Room } from 'src/app/private/models/room.model';
import {
  addRoom,
  addRoomSuccess,
  editRoom,
  editRoomSuccess,
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
  on(unSelectRoom, (state) => ({ ...state, roomSelected: null })),
  on(addRoom, (state) => ({ ...state })),
  on(addRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms, room],
  })),
  on(editRoom, (state) => ({ ...state })),
  on(editRoomSuccess, (state, { id, room }) => ({
    ...state,
    rooms: state.rooms.map((oldRoom) => {
      if (oldRoom.id === id) {
        return room;
      }
      return oldRoom;
    }),
  }))
);

export const roomsReducer = (state, action) => _roomsReducer(state, action);