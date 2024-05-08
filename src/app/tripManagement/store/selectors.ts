import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItineraryState } from '../../models/state';
import { tripManagementFeatureKey } from './reducer';

export const selectTripManagementState = createFeatureSelector<ItineraryState>(
  tripManagementFeatureKey
);

// TO-DO Sort in order of earliest to latest item
export const selectItinerary = createSelector(
  selectTripManagementState,
  (state) => state.itinerary
);

export const selectTripDetails = createSelector(
  selectTripManagementState,
  (state) => state.trip
);
