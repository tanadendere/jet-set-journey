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
import {
  selectCurrency,
  selectUser,
} from '../../../userManagement/store/selectors';
import { getCurrencyCodes } from '../../utilities/utils';
import { HeaderComponent } from '../../../components/home/header/header.component';
import { AddItemComponent } from './add-item/add-item.component';

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
    HeaderComponent,
    AddItemComponent,
  ],
})
export class TripDetailsComponent {
  userStore: Store<UserState> = inject(Store);
  user$ = this.userStore.select(selectUser);
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

  toggleTripForm(submissionStatus: boolean) {
    const form = document.getElementById('add-item-form');
    if (form) {
      if (submissionStatus) {
        form.style.display = 'none';
      } else {
        form.style.display = 'block';
      }
    }
  }

  ngOnDestory() {
    this.tripSubscription.unsubscribe();
    this.totalCostSubscription.unsubscribe();
    this.itinerarySubscription.unsubscribe();
    this.selectedCurrencySubscription.unsubscribe();
  }
}
