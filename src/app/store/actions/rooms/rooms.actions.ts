import { createAction, props } from '@ngrx/store';
import { Room } from 'src/app/private/models/room.interface';

export const loadRooms = createAction('[Rooms] Load Rooms');

export const loadRoomsSuccess = createAction(
  '[Rooms] Load rooms success',
  props<{ rooms: Room[] }>()
);

export const selectRoom = createAction(
  '[Rooms] Select Room',
  props<{ roomSelected: Room }>()
);

export const unSelectRoom = createAction('[Rooms] UnSelect Room');

export const addRoom = createAction(
  '[Rooms] Add Room',
  props<{ room: Room }>()
);

export const addRoomSuccess = createAction(
  '[Rooms] Add Room Success',
  props<{ room: Room }>()
);

export const editRoom = createAction(
  '[Rooms] Edit Room',
  props<{ id: string; room: Room }>()
);

export const editRoomSuccess = createAction(
  '[Rooms] Edit Room Success',
  props<{ id: string; room: Room }>()
);

export const deleteRoom = createAction(
  '[Rooms] Delete Room',
  props<{ id: string }>()
);

export const deleteRoomSuccess = createAction(
  '[Rooms] Delete Room Success',
  props<{ id: string }>()
);

export const roomsError = createAction(
  '[Rooms] rooms Error',
  props<{ payload: any }>()
);
