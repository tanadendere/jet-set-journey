import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/state';
import { userFeatureKey } from './reducers';

export const selectUserState = createFeatureSelector<AppState>(userFeatureKey);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);
