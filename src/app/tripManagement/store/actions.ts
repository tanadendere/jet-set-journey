import { createAction, props, union } from '@ngrx/store';
import { ITrip } from '../../userDashboard/models/trip';
import { IItineraryItem } from '../models/itinerary';
import { ICurrency, ICurrencyData } from '../../userManagement/models/currency';
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
  '[Trip Management] Get the latest exchange rate itinerary',
  props<{ selectedCurrency: string; itemCurrencies: string[] }>()
);
export const getExchangeRatesComplete = createAction(
  '[Trip Management] Get the total cost of itinerary complete',
  props<{ exchangeRates: IExchangeRate[] }>()
);

// export const getInternalCurrencyList = createAction(
//   '[Trip Management] Get the internal list of currencies'
// );
// export const getCurrencyListComplete = createAction(
//   '[Trip Management] Get the list of currencies complete',
//   props<{ currencyData: ICurrencyData }>()
// );

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
  // getCurrencyList,
  // getInternalCurrencyList,
  // getCurrencyListComplete,
});
export type CoreActionsUnion = typeof all;
