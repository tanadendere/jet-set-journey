import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState } from '../../models/state';
import { userDashboardFeatureKey } from './reducer';
import { ITrip } from '../../tripManagement/models/trip';
import { IPlaceSearchResult } from '../../models/placesAPI';

export const selectUserDashboardState = createFeatureSelector<TripState>(
  userDashboardFeatureKey
);

export const selectTrips = createSelector(selectUserDashboardState, (state) => {
  if (state.trips && state.trips.length > 0) {
    return state.trips;
  } else {
    return undefined;
  }
});
