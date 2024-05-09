import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, NgIf],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  store: Store<UserState> = inject(Store);
  userSubscription: Subscription = new Subscription();
  user$: Observable<IUser | undefined> = this.store.select(selectUser);

  hasUnsavedChanges = true;

  form = this.fb.nonNullable.group(
    {
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(254),
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z\-\'\s]*$/),
        ],
      ],
      surname: [
        '',
        [Validators.maxLength(30), Validators.pattern(/^[A-Za-z\-\'\s]*$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,}$/
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          // this.confirmPasswordValidator(),
        ],
      ],
    },
    {
      validators: this.confirmPasswordValidator('password', 'confirmPassword'),
    }
  );
  errorMessage: string | null = null;

  get email() {
    return this.form.get('email');
  }
  get name() {
    return this.form.get('name');
  }
  get surname() {
    return this.form.get('surname');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  confirmPasswordValidator(
    password: string,
    matchingPassword: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const passwordControl = abstractControl.get(password);
      const matchingPaaswordControl = abstractControl.get(matchingPassword);

      if (
        matchingPaaswordControl!.errors &&
        !matchingPaaswordControl!.errors?.['confirmedValidator']
      ) {
        return null;
      }

      if (passwordControl!.value !== matchingPaaswordControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingPaaswordControl!.setErrors(error);
        return error;
      } else {
        matchingPaaswordControl!.setErrors(null);
        return null;
      }
    };
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.hasUnsavedChanges = false;
    if (this.form.valid && rawForm.password == rawForm.confirmPassword) {
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
  }

  ngOnDestory() {
    this.userSubscription.unsubscribe();
  }
}
