import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

export const login = createAction(
  '[auth] login User',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[auth] login User succes',
  props<{ user: User; token: string }>()
);

export const loginError = createAction(
  '[auth] login User Error',
  props<{ payload: any }>()
);
