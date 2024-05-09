import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
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
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          updateProfile(response.user, { displayName: name });
          return response.user.uid;
        }
      )
    );
  }

  login(email: string, password: string): Observable<UserCredential | void> {
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
