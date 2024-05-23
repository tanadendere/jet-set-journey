import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItineraryState } from '../../models/state';
import { tripManagementFeatureKey } from './reducer';
import { calculateItineraryTotalCost, sortItinerary } from '../utilities/utils';

export const selectTripManagementState = createFeatureSelector<ItineraryState>(
  tripManagementFeatureKey
);

// TO-DO Sort in order of earliest to latest item
export const selectItinerary = createSelector(
  selectTripManagementState,
  (state) => {
    if (state.itinerary == undefined || state.itinerary.length == 0) {
      return undefined;
    } else {
      return sortItinerary(state.itinerary);
    }
  }
);

export const selectTripDetails = createSelector(
  selectTripManagementState,
  (state) => state.trip
);

export const selectTotalCost = createSelector(
  selectTripManagementState,
  (state) => {
    if (!(state.itinerary && state.exchangeRates)) {
      return 0;
    }
    return calculateItineraryTotalCost(state.itinerary, state.exchangeRates);
  }
);
