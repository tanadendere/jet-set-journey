import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ItineraryState } from '../../../models/state';
import { Store } from '@ngrx/store';
import {
  selectCurrencies,
  selectItinerary,
  selectTripDetails,
} from '../../store/selectors';
import { IItineraryItem } from '../../models/itinerary';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITrip } from '../../../userDashboard/models/trip';
import {
  addItineraryItemToFirestore,
  getCurrencyList,
  getItineraryItemsFromFirestore,
} from '../../store/actions';
import { ItineraryItemComponent } from './itinerary-item/itinerary-item.component';
import { ICurrency } from '../../models/currency';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    ItineraryItemComponent,
  ],
})
export class TripDetailsComponent {
  fb = inject(FormBuilder);

  store: Store<ItineraryState> = inject(Store);
  currencies$ = this.store.select(selectCurrencies);
  selectedCurrencyCode: string | undefined;
  itinerary$ = this.store.select(selectItinerary);
  trip$ = this.store.select(selectTripDetails);
  trip: ITrip | undefined = undefined;
  tripSubscription = new Subscription();

  router = inject(Router);

  constructor() {
    this.tripSubscription = this.trip$.subscribe((trip) => {
      if (trip) {
        this.trip = trip;
        this.store.dispatch(getItineraryItemsFromFirestore({ trip: trip }));
      }
    });
    this.store.dispatch(getCurrencyList());
  }

  onSelectCurrency(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCurrencyCode = target.value;
    console.log(this.selectedCurrencyCode);
  }

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    itineraryTag: ['', Validators.required],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    currency: ['', Validators.required],
    costEstimate: ['', Validators.required],
    notes: ['', Validators.required],
  });

  addAnItem() {
    if (this.trip) {
      const rawForm = this.form.getRawValue();
      const itineraryItem: IItineraryItem = {
        itineraryName: rawForm.name,
        tripId: this.trip.tripId,
        tag: rawForm.itineraryTag,
        startDateTime: rawForm.startDateTime,
        endDateTime: rawForm.endDateTime,
        currency: rawForm.currency,
        costEstimate: Number(rawForm.costEstimate),
        location: rawForm.location,
        notes: rawForm.notes,
      };
      this.store.dispatch(
        addItineraryItemToFirestore({
          trip: this.trip,
          itineraryItem: itineraryItem,
        })
      );
    } else {
      alert(
        'Oops! Looks like we cannot access the trip to add this itinerary to :(. Please select a trip.'
      );
      this.router.navigateByUrl('trips');
    }
  }

  ngOnDestory() {
    this.tripSubscription.unsubscribe();
  }
}
