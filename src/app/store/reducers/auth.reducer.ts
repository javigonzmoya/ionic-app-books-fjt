import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { login, loginError, loginSuccess } from '../actions';

export interface AuthState {
  usuario: User;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const authInitialState: AuthState = {
  usuario: null,
  loaded: false,
  loading: true,
  error: null,
};

// eslint-disable-next-line no-underscore-dangle
const _authReducer = createReducer(
  authInitialState,
  on(login, (state, { email, password }) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(loginError, (state, { payload }) => ({
    ...state,
    user: null,
    error: payload,
  }))
);

export const authReducer = (state, action) => _authReducer(state, action);
