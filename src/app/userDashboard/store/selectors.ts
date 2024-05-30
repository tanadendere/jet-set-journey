import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState } from '../../models/state';
import { userDashboardFeatureKey } from './reducer';
import { ITrip } from '../../tripManagement/models/trip';
import { IPlaceSearchResult } from '../../models/placesAPI';

export const selectUserDashboardState = createFeatureSelector<TripState>(
  userDashboardFeatureKey
);

export const selectTrips = createSelector(selectUserDashboardState, (state) => {
  if (state.trips) {
    const trips: ITrip[] = [];
    for (const trip of state.trips) {
      if (trip) {
        if (trip.destination) {
          try {
            const locationResult: IPlaceSearchResult = JSON.parse(
              trip.destination
            );
            if (locationResult) {
              trip.googleDestination = locationResult;
            }
          } catch (error) {}
        }
        trips.push(trip);
      }
    }
    return trips;
  }
  return state.trips;
});
