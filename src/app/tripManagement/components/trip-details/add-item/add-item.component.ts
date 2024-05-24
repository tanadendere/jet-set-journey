import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { IItineraryItem } from '../../../../eventManagement/models/itinerary';
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

  dateToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return new Date(year, month, day, hour, minute);
  }

  getMinDateForEndDateTime() {
    const rawForm = this.form.getRawValue();
    return rawForm.startDateTime;
  }

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    location: [''],
    itineraryTag: ['', Validators.required],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    costEstimate: [, Validators.required],
    notes: [''],
  });

  get name() {
    return this.form.get('name');
  }
  get location() {
    return this.form.get('itineraryTag');
  }
  get itineraryTag() {
    return this.form.get('itineraryTag');
  }
  get startDateTime() {
    return this.form.get('startDateTime');
  }
  get endDateTime() {
    return this.form.get('endDateTime');
  }
  get costEstimate() {
    return this.form.get('costEstimate');
  }

  @Output() submittedEvent = new EventEmitter<boolean>();

  cancel(): void {
    this.form.reset();
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

      const startDate = new Date(itineraryItem.startDateTime);
      const endDate = new Date(itineraryItem.endDateTime);

      if (endDate < startDate) {
        alert(
          'We cannot save this event. The start date must before the end date.'
        );
      } else {
        this.itineraryStore.dispatch(
          addItineraryItemToFirestore({
            trip: this.trip,
            itineraryItem: itineraryItem,
          })
        );
        this.submittedEvent.emit(true);
        this.form.reset();
      }
    } else {
      alert(
        'Oops! Looks like we cannot access the trip to add this itinerary to :(. Please select a trip.'
      );
      this.router.navigateByUrl('trips');
    }
  }
}
