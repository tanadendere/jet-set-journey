import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { loginUser } from '../../store/actions';
import { Store } from '@ngrx/store';
import { UserState } from '../../../models/state';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../guards/models/user';
import { selectUser } from '../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  store: Store<UserState> = inject(Store);
  userSubscription: Subscription = new Subscription();
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
