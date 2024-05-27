import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, retry, catchError, EMPTY } from 'rxjs';
import { CrudService } from '../services/crud.service';
import {
  CoreActionsUnion,
  getTripsFromFirestore,
  addTripToFirestore,
  getTripsComplete,
} from './actions';

@Injectable()
export class UserDashboardEffects {
  addTripToFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTripToFirestore.type),
      switchMap((action) =>
        this.crudService
          .addTrip(action.userEmail, action.tripName, action.destination)
          .pipe(
            map(() => {
              return getTripsFromFirestore({
                userEmail: action.userEmail,
              });
            }),
            retry(1),
            catchError((err) => {
              alert(
                `Unfortunately we could not add ${action.tripName} to the database. Please try adding it again. \n\n` +
                  err.toString()
              );
              return EMPTY;
            })
          )
      )
    )
  );

  getTripsFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTripsFromFirestore.type),
      switchMap((action) =>
        this.crudService.getTrips(action.userEmail).pipe(
          map((trips) => {
            return getTripsComplete({ trips: trips });
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

  constructor(
    private actions$: Actions<CoreActionsUnion>,
    private crudService: CrudService
  ) {}
}
