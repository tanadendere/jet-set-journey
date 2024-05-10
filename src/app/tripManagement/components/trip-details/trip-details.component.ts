import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ItineraryState, UserState } from '../../../models/state';
import { Store } from '@ngrx/store';
import {
  selectItinerary,
  selectTotalCost,
  selectTripDetails,
} from '../../store/selectors';
import { IItineraryItem } from '../../models/itinerary';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITrip } from '../../models/trip';
import {
  addItineraryItemToFirestore,
  getExchangeRates,
  getItineraryItemsFromFirestore,
} from '../../store/actions';
import { ItineraryItemComponent } from './itinerary-item/itinerary-item.component';
import { selectCurrency } from '../../../userManagement/store/selectors';
import { getCurrencyCodes } from '../../utilities/utils';

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

  userStore: Store<UserState> = inject(Store);
  selectedCurrency$ = this.userStore.select(selectCurrency);
  selectedCurrencySubscription = new Subscription();
  selectedCurrencyCode = '';

  itineraryStore: Store<ItineraryState> = inject(Store);
  itinerary$ = this.itineraryStore.select(selectItinerary);
  itinerarySubscription = new Subscription();

  trip$ = this.itineraryStore.select(selectTripDetails);
  trip: ITrip | undefined = undefined;
  tripSubscription = new Subscription();

  router = inject(Router);

  totalCost$ = this.itineraryStore.select(selectTotalCost);
  totalCostSubscription = new Subscription();
  totalCost = 0;

  constructor() {
    this.tripSubscription = this.trip$.subscribe((trip) => {
      if (trip) {
        this.trip = trip;
        this.itineraryStore.dispatch(
          getItineraryItemsFromFirestore({ trip: trip })
        );
      }
    });
    this.selectedCurrencySubscription = this.selectedCurrency$.subscribe(
      (selectedCurrency) => {
        if (selectedCurrency) {
          this.selectedCurrencyCode = selectedCurrency.code;
          this.itinerarySubscription = this.itinerary$.subscribe(
            (itinerary) => {
              if (itinerary) {
                this.itineraryStore.dispatch(
                  getExchangeRates({
                    selectedCurrency: selectedCurrency.code,
                    itemCurrencies: getCurrencyCodes(itinerary),
                  })
                );
              }
            }
          );
        }
      }
    );
    this.totalCostSubscription = this.totalCost$.subscribe((totalCost) => {
      if (totalCost) {
        this.totalCost = totalCost;
      }
    });
  }

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

  addAnItem() {
    const rawForm = this.form.getRawValue();
    if (this.trip && this.form.valid) {
      const itineraryItem: IItineraryItem = {
        itineraryName: rawForm.name,
        tripId: this.trip.tripId,
        tag: rawForm.itineraryTag,
        startDateTime: rawForm.startDateTime,
        endDateTime: rawForm.endDateTime,
        currency: this.selectedCurrencyCode,
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
    } else {
      alert(
        'Oops! Looks like we cannot access the trip to add this itinerary to :(. Please select a trip.'
      );
      this.router.navigateByUrl('trips');
    }
  }

  ngOnDestory() {
    this.tripSubscription.unsubscribe();
    this.totalCostSubscription.unsubscribe();
    this.itinerarySubscription.unsubscribe();
    this.selectedCurrencySubscription.unsubscribe();
  }
}
