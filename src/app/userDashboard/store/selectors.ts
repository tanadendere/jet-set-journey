import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState } from '../../models/state';
import { userDashboardFeatureKey } from './reducer';

export const selectUserDashboardState = createFeatureSelector<TripState>(
  userDashboardFeatureKey
);

export const selectTrips = createSelector(
  selectUserDashboardState,
  (state) => state.trips
);
