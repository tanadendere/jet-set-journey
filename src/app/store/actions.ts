import { createAction, props } from '@ngrx/store';
import { IUser } from '../models/user';

export const registerUser = createAction(
  '[Register Page] Register',
  props<{ email: string; name: string; surname: string; password: string }>()
);

export const addUserToFirestore = createAction(
  '[DB Service] Add user to Firestore',
  props<{ user: IUser }>()
);

export const registerUserComplete = createAction(
  '[Auth Firebase] User register success',
  props<{ user: IUser }>()
);

export const loginUser = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);

export const getUserFromFirestore = createAction(
  '[DB Service] User retrival from Firestore',
  props<{ email: string }>()
);

export const loginUserComplete = createAction(
  '[Auth Firebase] User login success',
  props<{ user: IUser }>()
);
