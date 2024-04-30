import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addUserToFirestore,
  getUserFromFirestore,
  loginUser,
  loginUserComplete,
  registerUser,
  registerUserComplete,
} from './actions';
import { EMPTY, catchError, map, retry, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/user';
import { CrudService } from '../services/crud.service';

@Injectable()
export class UserManagementEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private crudService: CrudService
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
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
      ofType(addUserToFirestore),
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
      ofType(loginUser),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map(() => {
            return getUserFromFirestore({ email: action.email });
          }),
          retry(1),
          catchError((err) => {
            alert(`This user does not exit` + err.toString());
            return EMPTY;
          })
        )
      )
    )
  );

  getUserFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserFromFirestore),
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
}
