import { createAction, props, union } from '@ngrx/store';
import { ITrip } from '../../userDashboard/models/trip';
import { IItineraryItem } from '../models/itinerary';

export const getTripDetailsPage = createAction(
  '[Trip Management] Get trip details',
  props<{ trip: ITrip }>()
);

export const editTripById = createAction(
  '[Trip Management] Edit trip details',
  props<{ userEmail: string; tripId: string }>()
);

export const editTripByIdComplete = createAction(
  '[Trip Management] Edit trip details success',
  props<{ trip: ITrip }>()
);

export const getItineraryItemsFromFirestore = createAction(
  '[Trip Management] Get itinerary items from Firestore',
  props<{ trip: ITrip }>()
);

export const getItineraryItemsFromFirestoreComplete = createAction(
  '[Trip Management] Get itinerary items from Firestore success',
  props<{ itinerary: IItineraryItem[] }>()
);

export const addItineraryItemToFirestore = createAction(
  '[Trip Management] Add itinerary item to Firestore',
  props<{ trip: ITrip; itineraryItem: IItineraryItem }>()
);
export const editItineraryItemInFirestore = createAction(
  '[Trip Management] Edit itinerary item in Firestore',
  props<{ trip: ITrip; itineraryItem: IItineraryItem }>()
);
export const deleteItineraryItemFromFirestore = createAction(
  '[Trip Management] Delete itinerary item from Firestore',
  props<{ trip: ITrip; itineraryItemId: string }>()
);

const all = union({
  editTripById,
  editTripByIdComplete,
  getItineraryItemsFromFirestore,
  getItineraryItemsFromFirestoreComplete,
  addItineraryItemToFirestore,
  editItineraryItemInFirestore,
  deleteItineraryItemFromFirestore,
});
export type CoreActionsUnion = typeof all;
