import { createAction, props, union } from '@ngrx/store';
import { ITrip } from '../models/trip';

export const addTripToFirestore = createAction(
  '[UserDashboard] Add trip to Firestore',
  props<{ userEmail: string; tripName: string; destination: string }>()
);

export const getTripsFromFirestore = createAction(
  '[UserDashboard] Get trips from Firestore',
  props<{ userEmail: string }>()
);

export const getTripsComplete = createAction(
  '[UserDashboard] Get trips from Firestore success',
  props<{ trips: ITrip[] }>()
);

export const deleteTripFromFirestore = createAction(
  '[UserDashboard] Delete trip from Firestore',
  props<{ userEmail: string; tripId: string }>()
);

const all = union({
  addTripToFirestore,
  getTripsFromFirestore,
  getTripsComplete,
  deleteTripFromFirestore,
});

export type CoreActionsUnion = typeof all;
