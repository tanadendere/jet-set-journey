import { isDevMode } from '@angular/core';
import {
  createReducer,
  on,
  ActionReducerMap,
  ActionReducer,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import { ItemState, ItineraryState } from '../../../models/state';
import { logoutUser } from '../../../userManagement/store/actions';
import { getItemDetailsPage } from './actions';

export const itemManagementFeatureKey = 'itemManagementFeature';

const initialState: ItemState = {
  item: undefined,
};

export const itemManagementReducer = createReducer(
  initialState,
  on(getItemDetailsPage, (state, { item }) => ({
    ...state,
    item,
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
