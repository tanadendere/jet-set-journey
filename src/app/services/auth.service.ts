import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { IUser } from '../models/user';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  crudService = inject(CrudService);
  user$ = user(this.firebaseAuth); // persisting user when logged in
  currentUserSignal = signal<IUser | null | undefined>(undefined); // undefined because it takes time to get the user

  register(
    email: string,
    name: string,
    surname: string,
    password: string
  ): Observable<void> {
    let newUser: IUser = {
      email: email,
      name: name,
      surname: surname,
      password: password,
      userId: '',
    };

    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
      .then((response) => {
        updateProfile(response.user, { displayName: name });
        newUser.userId = response.user.uid;
        this.crudService.addUser(newUser);
      })
      .catch((error) =>
        console.error('Error with registering the user.', error)
      )
      .finally(() => alert(`${name} has been successfully registered!`));

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
