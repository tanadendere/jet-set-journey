import { MetaReducer, createReducer, on } from '@ngrx/store';
import { AppState } from '../models/state';
import { loginUserComplete, registerUserComplete } from './actions';
import { IUser } from '../models/user';
import { isDevMode } from '@angular/core';

export const userFeatureKey = 'userFeature';

const intialState: AppState = {
  user: undefined,
};

export const userManagementReducers = createReducer(
  intialState,
  on(registerUserComplete, (state, { user }) => {
    console.log(user);
    return {
      ...state,
      user,
    };
  }),
  on(loginUserComplete, (state, { user }) => {
    console.log(user);
    return {
      ...state,
      user,
    };
  })
);

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
