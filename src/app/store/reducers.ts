import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { AppState } from '../models/state';
import { loginUserComplete, logoutUser, registerUserComplete } from './actions';
import { IUser } from '../models/user';
import { isDevMode } from '@angular/core';

export const userFeatureKey = 'userFeature';

const intialState: AppState = {
  user: undefined,
};

export const userManagementReducers = createReducer(
  intialState,
  on(registerUserComplete, (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(loginUserComplete, (state, { user }) => {
    return {
      ...state,
      user,
    };
  })
);

export const reducers: ActionReducerMap<AppState> = {};

const debugMeta = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
};

const logoutMeta = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return (state, action) => {
    if (action?.type === logoutUser.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode()
  ? [debugMeta]
  : [logoutMeta];
