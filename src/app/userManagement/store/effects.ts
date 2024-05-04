import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CoreActionsUnion,
  addUserToFirestore,
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
import { IUser } from '../guards/models/user';
import { CrudService } from '../services/crud.service';

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
                `${action.name}, unfortunately we could not register you. Please try again` +
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
              `${action.user.name}, unfortunately we could not add you to the database. Please register again.` +
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
            alert(`This user does not exist` + err.toString());
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
            alert(`This user does not exist` + err.toString());
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
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions<CoreActionsUnion>,
    private authService: AuthService,
    private crudService: CrudService
  ) {}
}
