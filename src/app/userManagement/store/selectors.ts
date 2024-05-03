import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../models/state';
import { userFeatureKey } from './reducers';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);
