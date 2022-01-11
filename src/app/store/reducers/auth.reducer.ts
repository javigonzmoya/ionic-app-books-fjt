import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import {
  authError,
  login,
  loginSuccess,
  logout,
  register,
  renewToken,
} from '../actions';

export interface AuthState {
  user: User;
  loading: boolean;
  error: any;
}

export const authInitialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// eslint-disable-next-line no-underscore-dangle
const _authReducer = createReducer(
  authInitialState,
  on(login, (state) => ({ ...state, loading: true })),
  on(register, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(renewToken, (state) => ({ ...state, loading: true })),
  on(logout, (state) => ({ ...state, user: null, loading: false })),
  on(authError, (state, { payload }) => ({
    ...state,
    user: null,
    loading: false,
    error: payload,
  }))
);

export const authReducer = (state, action) => _authReducer(state, action);
