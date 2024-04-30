import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { EMPTY, Observable, from } from 'rxjs';
import { IUser } from '../models/user';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  crudService = inject(CrudService);
  user$ = user(this.firebaseAuth); // persisting user when logged in
  // currentUserSignal = signal<IUser | null | undefined>(undefined); // undefined because it takes time to get the user

  register(
    email: string,
    name: string,
    password: string
  ): Observable<string | void> {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        .then((response) => {
          updateProfile(response.user, { displayName: name });
          return response.user.uid;
        })
        .catch((error) =>
          console.error('Error with registering the user.', error)
        )
    );

    // return from(promise);
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          return response;
        }
      )
    );
    // .then(() => {
    //   this.crudService.getUser(email).then((user) => {
    //     this.currentUserSignal.set(user);
    //   });
    // });
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
