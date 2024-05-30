import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CoreActionsUnion,
  addUserToFirestore,
  getCurrencyList,
  getCurrencyListComplete,
  getInternalCurrencyList,
  getUserFromFirestore,
  loginUser,
  loginUserComplete,
  loginUserError,
  logoutUser,
  logoutUserComplete,
  registerUser,
  registerUserComplete,
  registerUserError,
} from './actions';
import { EMPTY, catchError, map, retry, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/user';
import { CrudService } from '../services/crud.service';
import { CurrencyService } from '../services/currency.service';
import { UserState } from '../../models/state';
import { Store } from '@ngrx/store';

@Injectable()
export class UserManagementEffects {
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser.type),
      switchMap((action) =>
        this.authService
          .register(action.email, action.name, action.password)
          .pipe(
            map((response) => {
              let newUser: IUser = {
                email: action.email,
                name: action.name,
                surname: action.surname,
                password: action.password,
                userId: response ? response : '',
              };
              return addUserToFirestore({ user: newUser });
            }),
            retry(1),
            catchError(() => {
              const message =
                'The email address you entered is already associated with an existing account. Please use a different email address or try logging in.';
              this.store.dispatch(registerUserError({ errorMessage: message }));
              return EMPTY;
            })
          )
      )
    )
  );

  addUserToFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserToFirestore.type),
      switchMap((action) =>
        this.crudService.addUser(action.user).pipe(
          map(() => {
            return registerUserComplete({ user: action.user });
          }),
          retry(1),
          catchError((err) => {
            const message = `${action.user.name}, unfortunately we could not add you to the database. Please register again.`;
            this.store.dispatch(registerUserError({ errorMessage: message }));
            console.error(err);
            return EMPTY;
          })
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser.type),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map(() => {
            return getUserFromFirestore({ email: action.email });
          }),
          retry(1),
          catchError((err) => {
            const message =
              'Invalid credentials provided. Please double-check your username and password and try again.';
            this.store.dispatch(loginUserError({ errorMessage: message }));
            console.error(err);
            return EMPTY;
          })
        )
      )
    )
  );

  getUserFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserFromFirestore.type),
      switchMap((action) =>
        this.crudService.getUser(action.email).pipe(
          map((user) => {
            return loginUserComplete({ user: user });
          }),
          retry(1),
          catchError((err) => {
            const message =
              'Invalid credentials provided. Please double-check your username and password and try again.';
            this.store.dispatch(loginUserError({ errorMessage: message }));
            console.error(err);
            return EMPTY;
          })
        )
      )
    )
  );

  // using internal list to prevent too many network calls for the drop down select
  getCurrencyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrencyList.type),
      switchMap(() =>
        this.currencyService.getInternalCurrencyList().pipe(
          map((currencyList) => {
            return getCurrencyListComplete({ currencyData: currencyList.data });
          }),
          retry(1),
          catchError((err) => {
            console.error(
              'Could not make a request to external currency api, using the internal data',
              err
            );
            this.store.dispatch(getInternalCurrencyList());
            return EMPTY;
          })
        )
      )
    )
  );

  getInternalCurrencyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getInternalCurrencyList.type),
      switchMap(() =>
        this.currencyService.getInternalCurrencyList().pipe(
          map((currencyList) => {
            return getCurrencyListComplete({ currencyData: currencyList.data });
          }),
          retry(1),
          catchError((err) => {
            console.error('Error, retriveing the list of currencies', err);
            return EMPTY;
          })
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser.type),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => {
            return logoutUserComplete();
          }),
          retry(1),
          catchError((err) => {
            console.error('Error logging user out');
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions<CoreActionsUnion>,
    private authService: AuthService,
    private crudService: CrudService,
    private currencyService: CurrencyService,
    private store: Store<UserState>
  ) {}
}
