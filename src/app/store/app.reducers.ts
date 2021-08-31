import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  auth: reducers.AuthState;
  ui: reducers.uiState;
  rooms: reducers.RoomsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: reducers.authReducer,
  ui: reducers.uiReducer,
  rooms: reducers.roomsReducer,
};
