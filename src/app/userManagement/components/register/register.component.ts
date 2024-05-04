import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/actions';
import { UserState } from '../../../models/state';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../models/user';
import { selectUser } from '../../store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  store: Store<UserState> = inject(Store);
  userSubscription: Subscription = new Subscription();
  user$: Observable<IUser | undefined> = this.store.select(selectUser);

  hasUnsavedChanges = true;

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.hasUnsavedChanges = false;
    this.store.dispatch(
      registerUser({
        email: rawForm.email,
        name: rawForm.name,
        surname: rawForm.surname,
        password: rawForm.password,
      })
    );

    this.userSubscription = this.user$.subscribe((user) => {
      if (user != undefined) {
        this.router.navigateByUrl('trips');
      }
    });
  }

  ngOnDestory() {
    this.userSubscription.unsubscribe();
  }
}
