import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { addTripToFirestore } from '../../../userDashboard/store/actions';
import { IUser } from '../../../userManagement/models/user';
import { LocationAutocompleteComponent } from '../../location-autocomplete/location-autocomplete.component';
import { IPlaceSearchResult } from '../../../models/placesAPI';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule, LocationAutocompleteComponent],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
})
export class AddTripComponent {
  @Input() user: IUser | undefined | null = undefined;

  fb = inject(FormBuilder);
  tripStore: Store<TripState> = inject(Store);

  destinationValue: IPlaceSearchResult | undefined;
  errorMessage = '';

  form = this.fb.nonNullable.group({
    tripName: ['', [Validators.required]],
    destination: ['', []],
  });

  get tripName() {
    return this.form.get('tripName');
  }
  get destination() {
    return this.form.get('destination');
  }

  @Output() submittedEvent = new EventEmitter<boolean>();

  cancel(): void {
    this.form.reset();
    this.submittedEvent.emit(true);
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (rawForm.destination === '' && this.destinationValue == undefined) {
      this.errorMessage = 'Please enter a destination.';
    } else if (this.user && this.form.valid) {
      this.tripStore.dispatch(
        addTripToFirestore({
          userEmail: this.user.email,
          tripName: rawForm.tripName,
          destination: this.destinationValue
            ? this.destinationValue
            : rawForm.destination,
        })
      );
      this.form.reset();
      this.submittedEvent.emit(true);
    }
  }
}
