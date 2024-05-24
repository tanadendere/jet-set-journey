import { createAction, props } from '@ngrx/store';
import { IItineraryItem } from '../../models/itinerary';

export const getItemDetailsPage = createAction(
  '[Trip Management] Get item details',
  props<{ item: IItineraryItem }>()
);
