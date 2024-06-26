import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { UserState } from '../../models/state';
import {
  getCurrencyListComplete,
  loginUserComplete,
  loginUserError,
  logoutUser,
  logoutUserComplete,
  registerUserComplete,
  registerUserError,
  selectUserCurrency,
} from './actions';
import { isDevMode } from '@angular/core';

export const userFeatureKey = 'userFeature';

const initialState: UserState = {
  user: undefined,
  currencyData: undefined,
  selectedCurrency: {
    symbol: 'R',
    name: 'South African Rand',
    symbolNative: 'R',
    decimalDigits: 2,
    rounding: 0,
    code: 'ZAR',
    namePlural: 'South African rand',
    type: 'fiat',
    countries: ['LS', 'NA', 'ZA', 'ZW'],
  },
  errorMessage: undefined,
};

export const userManagementReducer = createReducer(
  initialState,
  on(registerUserError, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(registerUserComplete, (state, { user }) => ({
    ...state,
    user,
    errorMessage: undefined,
  })),
  on(loginUserError, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(loginUserComplete, (state, { user }) => ({
    ...state,
    user,
    errorMessage: undefined,
  })),
  on(getCurrencyListComplete, (state, { currencyData }) => ({
    ...state,
    currencyData: currencyData,
  })),
  on(selectUserCurrency, (state, { selectedCurrency }) => ({
    ...state,
    selectedCurrency,
  })),
  on(logoutUserComplete, (state) => ({
    ...state,
    user: undefined,
  }))
);

// META REDUCERS TO LOG ACTIONS

export const reducers: ActionReducerMap<UserState> = {};

const debugMeta = (
  reducer: ActionReducer<UserState>
): ActionReducer<UserState> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
};

const logoutMeta = (
  reducer: ActionReducer<UserState>
): ActionReducer<UserState> => {
  return (state, action) => {
    if (action?.type === logoutUser.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<UserState>[] = isDevMode()
  ? [debugMeta]
  : [logoutMeta];
