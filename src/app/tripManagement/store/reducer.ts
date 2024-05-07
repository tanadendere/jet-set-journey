import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { ItineraryState } from '../../models/state';
import {
  logoutUser,
  logoutUserComplete,
} from '../../userManagement/store/actions';
import {
  getExchangeRatesComplete,
  getItineraryItemsFromFirestoreComplete,
  getTripDetailsPage,
} from './actions';
import { isDevMode } from '@angular/core';

export const tripManagementFeatureKey = 'tripManagementFeature';

const initialState: ItineraryState = {
  trip: undefined,
  itinerary: undefined,
  exchangeRates: undefined,
};

export const tripManagementReducers = createReducer(
  initialState,
  on(getTripDetailsPage, (state, { trip }) => ({
    ...state,
    trip,
  })),
  on(getItineraryItemsFromFirestoreComplete, (state, { itinerary }) => ({
    ...state,
    itinerary,
  })),
  on(getExchangeRatesComplete, (state, { exchangeRates }) => ({
    ...state,
    exchangeRates,
  })),
  on(logoutUserComplete, (state, {}) => ({
    ...state,
    trip: undefined,
    itinerary: undefined,
  }))
);

export const reducers: ActionReducerMap<ItineraryState> = {};

const debugMeta = (
  reducer: ActionReducer<ItineraryState>
): ActionReducer<ItineraryState> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
};

const logoutMeta = (
  reducer: ActionReducer<ItineraryState>
): ActionReducer<ItineraryState> => {
  return (state, action) => {
    if (action?.type === logoutUser.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<ItineraryState>[] = isDevMode()
  ? [debugMeta]
  : [logoutMeta];
