import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/actions';
import { AppState } from '../../models/state';
import { Observable, map } from 'rxjs';
import { IUser } from '../../models/user';
import { selectUser } from '../../store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  store: Store<AppState> = inject(Store);

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
    console.log('HELLO in register 4');
    // this.authService
    //   .register(, rawForm.name, rawForm.password)
    //   .subscribe({
    //     next: () => {
    //       this.router.navigateByUrl('login'); //redirect to homePage
    //     },
    //     error: (err) => {
    //       this.errorMessage = err.code;
    //     },
    //   });

    console.log('in register 2');
    this.user$.subscribe((user) => {
      if (user != undefined) {
        console.log(user);
        this.router.navigateByUrl('trips');
      }
      console.log('in register');
    });
  }
}
