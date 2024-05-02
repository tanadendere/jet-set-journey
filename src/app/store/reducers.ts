import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { AppState } from '../models/state';
import {
  loginUserComplete,
  logoutUser,
  logoutUserComplete,
  registerUserComplete,
} from './actions';
import { IUser } from '../models/user';
import { isDevMode } from '@angular/core';

export const userFeatureKey = 'userFeature';

const intialState: AppState = {
  user: undefined,
};

export const userManagementReducers = createReducer(
  intialState,
  on(registerUserComplete, (state, { user }) => {
    console.log('hello from reducers', user);
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
  }),
  on(logoutUserComplete, (state) => {
    return {
      ...state,
      user: undefined,
    };
  })
);

export const reducers: ActionReducerMap<AppState> = {};

const debugMeta = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return (state, action) => {
    console.log('action', action);
    console.log('state', state);
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
