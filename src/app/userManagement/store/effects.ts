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
  logoutUser,
  logoutUserComplete,
  registerUser,
  registerUserComplete,
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
            map((uid) => {
              let newUser: IUser = {
                email: action.email,
                name: action.name,
                surname: action.surname,
                password: action.password,
                userId: uid ? uid : '',
              };
              return addUserToFirestore({ user: newUser });
            }),
            retry(1),
            catchError((err) => {
              alert(
                `${action.name}, unfortunately we could not register you. Please try again \n\n` +
                  err.toString()
              );
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
            alert(
              `${action.user.name}, unfortunately we could not add you to the database. Please register again. \n\n` +
                err.toString()
            );
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
            alert(`This user does not exist \n\n` + err.toString());
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
            alert(`This user does not exist \n\n` + err.toString());
            return EMPTY;
          })
        )
      )
    )
  );

  getCurrencyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrencyList.type),
      switchMap(() =>
        this.currencyService.getCurrencyList().pipe(
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
            alert(
              `Unfortunately we could retrieve the list of currencies. \n\n` +
                err.toString()
            );
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
            alert(`Could not log you out. \n\n` + err.toString());
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
