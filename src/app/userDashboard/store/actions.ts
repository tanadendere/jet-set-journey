import { createAction, props, union } from '@ngrx/store';
import { ITrip } from '../../tripManagement/models/trip';
import { IPlaceSearchResult } from '../../models/placesAPI';

export const addTripToFirestore = createAction(
  '[UserDashboard] Add trip to Firestore',
  props<{
    userEmail: string;
    tripName: string;
    destination: IPlaceSearchResult | string;
  }>()
);

export const getTripsFromFirestore = createAction(
  '[UserDashboard] Get trips from Firestore',
  props<{ userEmail: string }>()
);

export const getTripsComplete = createAction(
  '[UserDashboard] Get trips from Firestore success',
  props<{ trips: ITrip[] }>()
);

const all = union({
  addTripToFirestore,
  getTripsFromFirestore,
  getTripsComplete,
});

export type CoreActionsUnion = typeof all;
