import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, retry, catchError, EMPTY } from 'rxjs';
import {
  addUserToFirestore,
  registerUserComplete,
} from '../../userManagement/store/actions';
import { CrudService } from '../services/crud.service';
import {
  CoreActionsUnion,
  getTripsFromFirestore,
  addTripToFirestore,
  getTripsComplete,
  deleteTripToFirestore,
} from './actions';
import { ITrip } from '../models/trip';

@Injectable()
export class UserDashboardEffects {
  // addTripToFirestore
  // deleteTripToFirestore

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
                `Unfortunately we could not add ${action.tripName} to the database. Please try adding it again.` +
                  err.toString()
              );
              return EMPTY;
            })
          )
      )
    )
  );

  deleteTripToFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTripToFirestore.type),
      switchMap((action) =>
        this.crudService.deleteTrip(action.userEmail, action.tripId).pipe(
          map(() => {
            return getTripsFromFirestore({
              userEmail: action.userEmail,
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
