import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { IItineraryItem } from '../../../models/itinerary';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { addItineraryItemToFirestore } from '../../../store/actions';
import { ICurrency } from '../../../../userManagement/models/currency';
import { ITrip } from '../../../models/trip';
import { Store } from '@ngrx/store';
import { ItineraryState } from '../../../../models/state';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  @Input() selectedCurrency: ICurrency | undefined | null = undefined;
  @Input() trip: ITrip | undefined | null = undefined;
  itineraryStore: Store<ItineraryState> = inject(Store);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    location: [''],
    itineraryTag: ['', Validators.required],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    costEstimate: [0, Validators.required],
    notes: [''],
  });

  get name() {
    return this.form.get('name');
  }
  get location() {
    return this.form.get('location');
  }

  @Output() submittedEvent = new EventEmitter<boolean>();

  cancel(): void {
    this.submittedEvent.emit(true);
  }

  addAnItem() {
    const rawForm = this.form.getRawValue();
    if (this.trip && this.selectedCurrency && this.form.valid) {
      const itineraryItem: IItineraryItem = {
        itineraryName: rawForm.name,
        tripId: this.trip.tripId,
        tag: rawForm.itineraryTag,
        startDateTime: rawForm.startDateTime,
        endDateTime: rawForm.endDateTime,
        currency: this.selectedCurrency.code,
        costEstimate: Number(rawForm.costEstimate),
        location: rawForm.location,
        notes: rawForm.notes,
      };
      this.itineraryStore.dispatch(
        addItineraryItemToFirestore({
          trip: this.trip,
          itineraryItem: itineraryItem,
        })
      );
      this.submittedEvent.emit(true);
    } else {
      alert(
        'Oops! Looks like we cannot access the trip to add this itinerary to :(. Please select a trip.'
      );
      this.router.navigateByUrl('trips');
    }
  }
}