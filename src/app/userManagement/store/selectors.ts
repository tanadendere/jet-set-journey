import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../models/state';
import { userFeatureKey } from './reducer';
import { getListOfCurrencies } from '../utilities/utils';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectErrorMessage = createSelector(
  selectUserState,
  (state) => state.errorMessage
);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectCurrencies = createSelector(selectUserState, (state) => {
  if (state.currencyData) {
    return getListOfCurrencies(state.currencyData);
  } else {
    return [];
  }
});

export const selectCurrency = createSelector(
  selectUserState,
  (state) => state.selectedCurrency
);
