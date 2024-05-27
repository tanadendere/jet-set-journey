import { createAction, props, union } from '@ngrx/store';
import { ITrip } from '../models/trip';
import { IItineraryItem } from '../../eventManagement/models/itinerary';
import { IExchangeRate } from '../models/exchangeRate';

export const getTripDetailsPage = createAction(
  '[Trip Management] Get trip details',
  props<{ trip: ITrip }>()
);

export const deleteTripFromFirestore = createAction(
  '[Trip Management] Delete trip from Firestore',
  props<{ userEmail: string; tripId: string }>()
);

export const deleteTripFromFirestoreComplete = createAction(
  '[Trip Management] Delete trip from Firestore complete'
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
  deleteTripFromFirestore,
  deleteTripFromFirestoreComplete,
  getExchangeRates,
  getExchangeRatesComplete,
});
export type CoreActionsUnion = typeof all;
