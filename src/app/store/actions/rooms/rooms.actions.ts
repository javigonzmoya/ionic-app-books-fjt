import { createAction, props } from '@ngrx/store';
import { Room } from 'src/app/private/models/room.model';

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

export const roomsError = createAction(
  '[Rooms] rooms Error',
  props<{ payload: any }>()
);
