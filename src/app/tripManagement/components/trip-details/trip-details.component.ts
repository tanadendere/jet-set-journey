import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
import { ITrip } from '../../../userDashboard/models/trip';
import {
  addItineraryItemToFirestore,
  getExchangeRates,
  // getCurrencyList,
  // getInternalCurrencyList,
  getItineraryItemsFromFirestore,
} from '../../store/actions';
import { ItineraryItemComponent } from './itinerary-item/itinerary-item.component';
import { ICurrency } from '../../../userManagement/models/currency';
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
  // currencies$ = this.store.select(selectCurrencies);
  selectedCurrency$ = this.userStore.select(selectCurrency);
  selectedCurrencySubscription = new Subscription();
  selectedCurrencyCode = '';
  store: Store<ItineraryState> = inject(Store);
  itinerary$ = this.store.select(selectItinerary);
  itinerarySubscription = new Subscription();

  trip$ = this.store.select(selectTripDetails);
  trip: ITrip | undefined = undefined;
  tripSubscription = new Subscription();

  router = inject(Router);
  totalCost = 0;
  totalCost$ = this.store.select(selectTotalCost);
  totalCostSubscription = new Subscription();

  constructor() {
    this.tripSubscription = this.trip$.subscribe((trip) => {
      if (trip) {
        this.trip = trip;
        this.store.dispatch(getItineraryItemsFromFirestore({ trip: trip }));
      }
    });
    // this.store.dispatch(getInternalCurrencyList());
    this.selectedCurrencySubscription = this.selectedCurrency$.subscribe(
      (selectedCurrency) => {
        if (selectedCurrency) {
          this.selectedCurrencyCode = selectedCurrency.code;
          this.itinerarySubscription = this.itinerary$.subscribe(
            (itinerary) => {
              if (itinerary) {
                this.store.dispatch(
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

  // onSelectCurrency(event: Event) {
  //   const target = event.target as HTMLSelectElement;
  //   this.selectedCurrencyCode = target.value;
  //   console.log(this.selectedCurrencyCode);
  // }

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
        currency: this.selectedCurrencyCode,
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
