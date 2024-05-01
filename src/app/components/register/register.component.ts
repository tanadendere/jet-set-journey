import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/actions';
import { AppState } from '../../models/state';

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

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.store.dispatch(
      registerUser({
        email: rawForm.email,
        name: rawForm.name,
        surname: rawForm.surname,
        password: rawForm.password,
      })
    );
    console.log('dispatched register');

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
  }
}
