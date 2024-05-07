import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, retry, catchError, EMPTY } from 'rxjs';
import { CrudService } from '../services/crud.service';
import {
  CoreActionsUnion,
  addItineraryItemToFirestore,
  deleteItineraryItemFromFirestore,
  getExchangeRates,
  getExchangeRatesComplete,
  // getCurrencyList,
  // getCurrencyListComplete,
  // getInternalCurrencyList,
  getItineraryItemsFromFirestore,
  getItineraryItemsFromFirestoreComplete,
} from './actions';
import { Injectable } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { ICurrency } from '../../userManagement/models/currency';
import { Store } from '@ngrx/store';
import { ItineraryState } from '../../models/state';
import fs from 'fs';
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
              alert(
                `Unfortunately we could not add that item to the database. Please try adding it again. \n\n` +
                  err.toString()
              );
              return EMPTY;
            })
          )
      )
    )
  );

  deleteItineraryItemFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItineraryItemFromFirestore.type),
      switchMap((action) =>
        this.crudService
          .deleteItineraryItem(action.trip, action.itineraryItemId)
          .pipe(
            map(() => {
              return getItineraryItemsFromFirestore({
                trip: action.trip,
              });
            }),
            retry(1),
            catchError((err) => {
              alert(
                `Unfortunately we could not delete this trip. Please try deleting it again. \n\n` +
                  err.toString()
              );
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
            alert(
              `Unfortunately we could retrieve your trips. \n\n` +
                err.toString()
            );
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
            retry(1),
            catchError((err) => {
              alert(
                `Unfortunately we could not get the current exchange rate. \n\n` +
                  err.toString()
              );
              return EMPTY;
            })
          )
      )
    )
  );

  // getCurrencyList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getCurrencyList.type),
  //     switchMap(() =>
  //       this.currencyService.retrieveCurrencyList().pipe(
  //         map((currencyList) => {
  //           fs.writeFile(
  //             'assets/currencies.json',
  //             JSON.stringify(currencyList),
  //             (err) => {
  //               if (err) {
  //                 console.log('Error writing file:', err);
  //               } else {
  //                 console.log('Successfully wrote file');
  //               }
  //             }
  //           );
  //           return getCurrencyListComplete({ currencyData: currencyList.data });
  //         }),
  //         retry(1),
  //         catchError((err) => {
  //           console.error(
  //             'Could not make a request to external currency api, using the internal data',
  //             err
  //           );
  //           this.store.dispatch(getInternalCurrencyList());
  //           return EMPTY;
  //         })
  //       )
  //     )
  //   )
  // );

  // getInternalCurrencyList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getInternalCurrencyList.type),
  //     switchMap(() =>
  //       this.currencyService.getInternalCurrencyList().pipe(
  //         map((currencyList) => {
  //           return getCurrencyListComplete({ currencyData: currencyList.data });
  //         }),
  //         retry(1),
  //         catchError((err) => {
  //           alert(
  //             `Unfortunately we could retrieve the list of currencies. \n\n` +
  //               err.toString()
  //           );
  //           return EMPTY;
  //         })
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions<CoreActionsUnion>,
    private crudService: CrudService,
    private currencyService: CurrencyService,
    private store: Store<ItineraryState>
  ) {}
}
