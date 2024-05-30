import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, retry, catchError, EMPTY } from 'rxjs';
import { CrudService } from '../services/crud.service';
import {
  deleteItineraryItemFromFirestore,
  CoreActionsUnion,
  deleteItineraryItemFromFirestoreComplete,
} from './actions';

@Injectable()
export class EventManagementEffects {
  deleteItineraryItemFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItineraryItemFromFirestore.type),
      switchMap((action) =>
        this.crudService
          .deleteItineraryItem(action.trip, action.itineraryItemId)
          .pipe(
            map(() => {
              return deleteItineraryItemFromFirestoreComplete();
            }),
            retry(1),
            catchError((err) => {
              console.error('Error, deleting event.', err);
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
