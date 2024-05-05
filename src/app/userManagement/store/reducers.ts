import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { UserState } from '../../models/state';
import {
  loginUserComplete,
  logoutUser,
  logoutUserComplete,
  registerUserComplete,
} from './actions';
import { isDevMode } from '@angular/core';

export const userFeatureKey = 'userFeature';

const initialState: UserState = {
  user: undefined,
};

export const userManagementReducers = createReducer(
  initialState,
  on(registerUserComplete, (state, { user }) => ({
    ...state,
    user,
  })),
  on(loginUserComplete, (state, { user }) => ({
    ...state,
    user,
  })),
  on(logoutUserComplete, (state) => ({
    ...state,
    user: undefined,
  }))
);

// META REDUCERS TO LOG ACTIONS

export const reducers: ActionReducerMap<UserState> = {};

const debugMeta = (
  reducer: ActionReducer<UserState>
): ActionReducer<UserState> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
};

const logoutMeta = (
  reducer: ActionReducer<UserState>
): ActionReducer<UserState> => {
  return (state, action) => {
    if (action?.type === logoutUser.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<UserState>[] = isDevMode()
  ? [debugMeta]
  : [logoutMeta];
