import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { AppState, TripState } from '../../models/state';
import { getTripsComplete } from './actions';
import { isDevMode } from '@angular/core';
import { logoutUser } from '../../userManagement/store/actions';
import { ITrip } from '../models/trip';

export const userDashboardFeatureKey = 'userDashboardFeature';

const intialState: TripState = {
  trips: undefined,
};

export const userDashboardReducers = createReducer(
  intialState,
  on(getTripsComplete, (state, { trips }) => ({
    ...state,
    trips,
  }))
);

export const reducers: ActionReducerMap<TripState> = {};

const debugMeta = (
  reducer: ActionReducer<TripState>
): ActionReducer<TripState> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
};

const logoutMeta = (
  reducer: ActionReducer<TripState>
): ActionReducer<TripState> => {
  return (state, action) => {
    if (action?.type === logoutUser.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<TripState>[] = isDevMode()
  ? [debugMeta]
  : [logoutMeta];
