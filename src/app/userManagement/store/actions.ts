import { createAction, props, union } from '@ngrx/store';
import { IUser } from '../models/user';
import { ICurrency, ICurrencyData } from '../models/currency';

export const registerUser = createAction(
  '[User] Register',
  props<{ email: string; name: string; surname: string; password: string }>()
);

export const registerUserError = createAction(
  '[User] Register Error',
  props<{ errorMessage: string }>()
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
export const loginUserError = createAction(
  '[User] Login Error',
  props<{ errorMessage: string }>()
);

export const getUserFromFirestore = createAction(
  '[User] Retrival from Firestore',
  props<{ email: string }>()
);

export const loginUserComplete = createAction(
  '[User] Login success',
  props<{ user: IUser }>()
);

export const getCurrencyList = createAction(
  '[User] Get the list of currencies'
);
export const getCurrencyListComplete = createAction(
  '[User] Get the list of currencies complete',
  props<{ currencyData: ICurrencyData }>()
);

export const getInternalCurrencyList = createAction(
  '[User] Get the internal list of currencies'
);

export const selectUserCurrency = createAction(
  '[User] Select the prefered currency for the user',
  props<{ selectedCurrency: ICurrency }>()
);

export const logoutUser = createAction('[User] Logout');

export const logoutUserComplete = createAction('[User] Logout success');

const all = union({
  registerUser,
  registerUserError,
  addUserToFirestore,
  registerUserComplete,
  loginUser,
  loginUserError,
  getCurrencyList,
  getCurrencyListComplete,
  getUserFromFirestore,
  loginUserComplete,
});

export type CoreActionsUnion = typeof all;
