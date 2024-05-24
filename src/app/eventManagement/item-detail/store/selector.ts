import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from '../../../models/state';
import { itemManagementFeatureKey } from './reducer';

export const selectItemManagementState = createFeatureSelector<ItemState>(
  itemManagementFeatureKey
);

export const selectItem = createSelector(selectItemManagementState, (state) => {
  if (state.item == undefined) {
    return undefined;
  } else {
    return state.item;
  }
});
