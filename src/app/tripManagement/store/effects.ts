import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, retry, catchError, EMPTY } from 'rxjs';
import { CrudService } from '../services/crud.service';
import {
  CoreActionsUnion,
  addItineraryItemToFirestore,
  deleteItineraryItemFromFirestore,
  getItineraryItemsFromFirestore,
  getItineraryItemsFromFirestoreComplete,
} from './actions';
import { Injectable } from '@angular/core';

@Injectable()
export class TripManagementEffects {
  // addItineraryItemToFirestore
  // deleteItineraryItemFromFirestore

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
                `Unfortunately we could not add that item to the database. Please try adding it again.` +
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
                `Unfortunately we could not delete this trip. Please try deleting it again.` +
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
              `Unfortunately we could retrieve your trips.` + err.toString()
            );
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions<CoreActionsUnion>,
    private crudService: CrudService
  ) {}
}
