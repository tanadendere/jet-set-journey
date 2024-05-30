import { createAction, props, union } from '@ngrx/store';
import { IItineraryItem } from '../models/itinerary';
import { ITrip } from '../../tripManagement/models/trip';

export const getItemDetailsPage = createAction(
  '[Item Management] Get item details',
  props<{ item: IItineraryItem }>()
);

export const editItineraryItemInFirestore = createAction(
  '[Item Management] Edit itinerary item in Firestore',
  props<{ trip: ITrip; itineraryItem: IItineraryItem }>()
);
export const deleteItineraryItemFromFirestore = createAction(
  '[Item Management] Delete itinerary item from Firestore',
  props<{ trip: ITrip; itineraryItemId: string }>()
);

export const deleteItineraryItemFromFirestoreComplete = createAction(
  '[Item Management]  Delete itinerary item from Firestore complete'
);

const all = union({
  getItemDetailsPage,
  editItineraryItemInFirestore,
  deleteItineraryItemFromFirestore,
  deleteItineraryItemFromFirestoreComplete,
});
export type CoreActionsUnion = typeof all;
