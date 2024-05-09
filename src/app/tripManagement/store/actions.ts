import { createAction, props, union } from '@ngrx/store';
import { ITrip } from '../models/trip';
import { IItineraryItem } from '../models/itinerary';
import { IExchangeRate } from '../models/exchangeRate';

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

export const getExchangeRates = createAction(
  '[Trip Management] Get the latest exchange rates',
  props<{ selectedCurrency: string; itemCurrencies: string[] }>()
);
export const getExchangeRatesComplete = createAction(
  '[Trip Management] Get the latest exchange rates complete',
  props<{ exchangeRates: IExchangeRate[] }>()
);

const all = union({
  editTripById,
  editTripByIdComplete,
  getItineraryItemsFromFirestore,
  getItineraryItemsFromFirestoreComplete,
  addItineraryItemToFirestore,
  editItineraryItemInFirestore,
  deleteItineraryItemFromFirestore,
  getExchangeRates,
  getExchangeRatesComplete,
});
export type CoreActionsUnion = typeof all;
