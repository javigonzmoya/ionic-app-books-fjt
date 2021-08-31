import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from '../actions/ui/ui.actions';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface uiState {
  loading: boolean;
}

export const uiInitialState: uiState = {
  loading: false,
};

// eslint-disable-next-line no-underscore-dangle
const _uiReducer = createReducer(
  uiInitialState,
  on(startLoading, (state) => ({ ...state, loading: true })),
  on(stopLoading, (state) => ({ ...state, loading: false }))
);

export const uiReducer = (state, action) => _uiReducer(state, action);
