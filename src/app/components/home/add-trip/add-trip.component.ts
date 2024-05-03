import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState, TripState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { addTripToFirestore } from '../../../userDashboard/store/actions';
import { IUser } from '../../../userManagement/models/user';
import { selectUser } from '../../../userManagement/store/selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
})
export class AddTripComponent {
  userStore: Store<AppState> = inject(Store);
  user$ = this.userStore.select(selectUser);

  @Input()
  user: IUser | undefined | null = undefined;

  fb = inject(FormBuilder);
  tripStore: Store<TripState> = inject(Store);

  form = this.fb.nonNullable.group({
    tripName: ['', Validators.required],
    destination: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    if (this.user != undefined) {
      this.tripStore.dispatch(
        addTripToFirestore({
          userEmail: this.user.email,
          tripName: rawForm.tripName,
          destination: rawForm.destination,
        })
      );
    }
  }
}
