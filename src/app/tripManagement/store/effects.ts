import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, retry, catchError, EMPTY } from 'rxjs';
import { CrudService } from '../services/crud.service';
import {
  CoreActionsUnion,
  addItineraryItemToFirestore,
  deleteTripFromFirestore,
  deleteTripFromFirestoreComplete,
  getExchangeRates,
  getExchangeRatesComplete,
  getItineraryItemsFromFirestore,
  getItineraryItemsFromFirestoreComplete,
} from './actions';
import { Injectable } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { getListOfExhangeRates } from '../utilities/utils';

@Injectable()
export class TripManagementEffects {
  addItineraryItemToFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItineraryItemToFirestore.type),
      switchMap((action) =>
        this.crudService
          .addItineraryItem(action.trip, action.itineraryItem)
          .pipe(
            map(() => {
              return getItineraryItemsFromFirestore({
                trip: action.trip,
              });
            }),
            retry(1),
            catchError((err) => {
              console.error('Error, adding item to database', err);
              return EMPTY;
            })
          )
      )
    )
  );

  getItineraryItemsFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getItineraryItemsFromFirestore.type),
      switchMap((action) =>
        this.crudService.getItineraryItems(action.trip).pipe(
          map((itineraryItems) => {
            return getItineraryItemsFromFirestoreComplete({
              itinerary: itineraryItems,
            });
          }),
          retry(1),
          catchError((err) => {
            console.error('Error retriving trips', err);
            return EMPTY;
          })
        )
      )
    )
  );

  getExchangeRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExchangeRates.type),
      switchMap((action) =>
        this.currencyService
          .latestExchangeRate(action.selectedCurrency, action.itemCurrencies)
          .pipe(
            map((response) => {
              return getExchangeRatesComplete({
                exchangeRates: getListOfExhangeRates(response?.data),
              });
            }),
            retry(0),
            catchError((err) => {
              console.error('Error with API latest exchange rate', err);
              return EMPTY;
            })
          )
      )
    )
  );

  deleteTripFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTripFromFirestore.type),
      switchMap((action) =>
        this.crudService.deleteTrip(action.userEmail, action.tripId).pipe(
          map(() => {
            return deleteTripFromFirestoreComplete();
          }),
          retry(1),
          catchError((err) => {
            console.error('Error with deleting the trip', err);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions<CoreActionsUnion>,
    private crudService: CrudService,
    private currencyService: CurrencyService
  ) {}
}
