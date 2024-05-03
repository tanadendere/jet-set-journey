import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { Observable, Subscription, from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);

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
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          return response;
        }
      )
    );
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    this.router.navigateByUrl('login');
    return from(promise);
  }
}
