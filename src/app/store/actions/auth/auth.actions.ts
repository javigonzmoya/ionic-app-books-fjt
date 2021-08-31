import { createAction, props } from '@ngrx/store';
import { ReqRegister } from 'src/app/core/models/reqRegister.model';
import { User } from 'src/app/core/models/user.model';

export const login = createAction(
  '[auth] login User',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[auth] login User succes',
  props<{ user: User; token: string }>()
);

export const register = createAction(
  '[auth] Register User',
  props<ReqRegister>()
);

export const renewToken = createAction('[auth] Renew Token');

export const authError = createAction(
  '[auth] login User Error',
  props<{ payload: any }>()
);

export const logout = createAction('[auth] logout');
