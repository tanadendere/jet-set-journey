import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItineraryState } from '../../models/state';
import { tripManagementFeatureKey } from './reducer';
import {
  calculateItineraryTotalCost,
  sortItinerary,
  getItineraryDates,
} from '../utilities/utils';
import { IPlaceSearchResult } from '../../models/placesAPI';

export const selectTripManagementState = createFeatureSelector<ItineraryState>(
  tripManagementFeatureKey
);

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

export const selectItineraryDates = createSelector(
  selectTripManagementState,
  (state) => {
    if (state.itinerary == undefined || state.itinerary.length == 0) {
      return undefined;
    } else {
      return getItineraryDates(state.itinerary);
    }
  }
);

export const selectTripDetails = createSelector(
  selectTripManagementState,
  (state) => {
    return state.trip;
  }
);

export const selectTotalCost = createSelector(
  selectTripManagementState,
  (state) => {
    if (!(state.itinerary && state.exchangeRates)) {
      return '0';
    }
    return calculateItineraryTotalCost(state.itinerary, state.exchangeRates);
  }
);

export const checkIfTripDeleted = createSelector(
  selectTripManagementState,
  (state) => {
    return state.deleted;
  }
);
