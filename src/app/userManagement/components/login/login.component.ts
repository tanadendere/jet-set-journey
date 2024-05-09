import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { loginUser } from '../../store/actions';
import { Store } from '@ngrx/store';
import { UserState } from '../../../models/state';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../models/user';
import { selectErrorMessage, selectUser } from '../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  store: Store<UserState> = inject(Store);
  userSubscription: Subscription = new Subscription();
  user$: Observable<IUser | undefined> = this.store.select(selectUser);

  errorMessage: string | undefined = undefined;
  error$ = this.store.select(selectErrorMessage);

  form = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{3,}$/),
      ],
    ],
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (this.form.valid) {
      this.store.dispatch(
        loginUser({ email: rawForm.email, password: rawForm.password })
      );
      this.userSubscription = this.user$.subscribe((user) => {
        if (user != undefined) {
          this.router.navigateByUrl('trips');
        }
      });
    }
  }

  ngOnDestory() {
    this.userSubscription.unsubscribe();
  }
}
