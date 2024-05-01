import { createAction, props, union } from '@ngrx/store';
import { IUser } from '../models/user';

export const registerUser = createAction(
  '[User] Register',
  props<{ email: string; name: string; surname: string; password: string }>()
);

export const addUserToFirestore = createAction(
  '[User] Add to Firestore',
  props<{ user: IUser }>()
);

export const registerUserComplete = createAction(
  '[User] Register success',
  props<{ user: IUser }>()
);

export const loginUser = createAction(
  '[User] Login',
  props<{ email: string; password: string }>()
);

export const getUserFromFirestore = createAction(
  '[User] Retrival from Firestore',
  props<{ email: string }>()
);

export const loginUserComplete = createAction(
  '[User] Login success',
  props<{ user: IUser }>()
);

export const logoutUser = createAction('[User] Logout success');

const all = union({
  registerUser,
});

export type CoreActionsUnion = typeof all;
