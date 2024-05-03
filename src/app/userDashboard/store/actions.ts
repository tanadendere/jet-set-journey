import { createAction, props, union } from '@ngrx/store';
import { ITrip } from '../models/trip';

// export const addTrip = createAction(
//   '[UserDashboard] Add trip',
//   props<{ userId: string; tripName: string; destination: string }>()
// );

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

// export const editTrip = createAction(
//   '[UserDashboard] Edit trip',
//   props<{ userEmail: string; tripName: string; destination: string }>()
// );

// export const deleteTrip = createAction(
//   '[UserDashboard] Delete trip',
//   props<{ tripId: string }>()
// );

export const deleteTripToFirestore = createAction(
  '[UserDashboard] Delete trip from Firestore',
  props<{ userEmail: string; tripId: string }>()
);

// export const deleteTripToFirestoreComplete = createAction(
//   '[UserDashboard] Delete trip success',
//   props<{ trips: ITrip[] }>()
// );

const all = union({
  addTripToFirestore,
  getTripsFromFirestore,
  getTripsComplete,
  deleteTripToFirestore,
});

export type CoreActionsUnion = typeof all;
