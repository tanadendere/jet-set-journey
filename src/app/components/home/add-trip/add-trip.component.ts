import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { addTripToFirestore } from '../../../userDashboard/store/actions';
import { IUser } from '../../../userManagement/models/user';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
})
export class AddTripComponent {
  @Input()
  user: IUser | undefined | null = undefined;

  fb = inject(FormBuilder);
  tripStore: Store<TripState> = inject(Store);

  form = this.fb.nonNullable.group({
    tripName: ['', [Validators.required]],
    destination: ['', [Validators.required]],
  });

  get tripName() {
    return this.form.get('tripName');
  }
  get destination() {
    return this.form.get('destination');
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (this.user && this.form.valid) {
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
