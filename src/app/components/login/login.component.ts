import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { loginUser } from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/state';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';
import { selectUser } from '../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  store: Store<AppState> = inject(Store);
  user$: Observable<IUser | undefined> = this.store.select(selectUser);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.store.dispatch(
      loginUser({ email: rawForm.email, password: rawForm.password })
    );
    // this.authService.login(rawForm.email, rawForm.password).subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/'); //redirect to homePage
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.code;
    //   },
    // });
    this.user$.subscribe((user) => {
      if (user != undefined) {
        console.log(user);
        this.router.navigateByUrl('trips');
      }
      console.log('in register');
    });
  }
}
