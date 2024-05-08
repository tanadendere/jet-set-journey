import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  CanDeactivateFn,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterComponent } from '../components/register/register.component';
import { Observable, map } from 'rxjs';
import { IUser } from '../models/user';
import { selectUser } from '../store/selectors';
import { UserState } from '../../models/state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  router = inject(Router);
  authService = inject(AuthService);
  store: Store<UserState> = inject(Store);
  user$: Observable<IUser | undefined> = this.store.select(selectUser);

  canActivate: CanActivateFn = () => {
    return this.checkAuth();
  };

  canActivateChild: CanActivateChildFn = () => {
    return this.checkAuth();
  };

  canDeactivate: CanDeactivateFn<RegisterComponent> = (component) => {
    if (component.hasUnsavedChanges) {
      return window.confirm(
        'You have unsaved changes. Do you really want to leave?'
      );
    }
    return true;
  };

  private checkAuth(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
