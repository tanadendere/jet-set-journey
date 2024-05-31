import { Location, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ItineraryState, TripState, UserState } from '../../../models/state';
import { Store } from '@ngrx/store';
import {
  checkIfTripDeleted,
  selectItinerary,
  selectItineraryDates,
  selectTotalCost,
  selectTripDetails,
} from '../../store/selectors';
import { IItineraryItem } from '../../../eventManagement/models/itinerary';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITrip } from '../../models/trip';
import {
  deleteTripFromFirestore,
  getExchangeRates,
  getItineraryItemsFromFirestore,
} from '../../store/actions';
import { ItineraryItemComponent } from './itinerary-item/itinerary-item.component';
import {
  selectCurrency,
  selectUser,
} from '../../../userManagement/store/selectors';
import { getCurrencyCodes, getItineraryDay } from '../../utilities/utils';
import { HeaderComponent } from '../../../components/header/header.component';
import { AddItemComponent } from './add-item/add-item.component';
import { getItemDetailsPage } from '../../../eventManagement/store/actions';
import { ICurrency } from '../../../userManagement/models/currency';

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
  userSelectedCurrency: ICurrency | undefined = undefined;
  selectedCurrencySubscription = new Subscription();
  selectedCurrencyCode = '';

  itineraryStore: Store<ItineraryState> = inject(Store);
  itinerary$ = this.itineraryStore.select(selectItinerary);
  itinerarySubscription = new Subscription();

  trip$ = this.itineraryStore.select(selectTripDetails);
  trip: ITrip | undefined = undefined;
  tripSubscription = new Subscription();

  store: Store<TripState> = inject(Store);

  router = inject(Router);
  location = inject(Location);

  totalCost$ = this.itineraryStore.select(selectTotalCost);
  totalCostSubscription = new Subscription();
  totalCost = '0';

  itineraryDates$ = this.itineraryStore.select(selectItineraryDates);
  itineraryDatesSubscription = new Subscription();

  deleted$ = this.itineraryStore.select(checkIfTripDeleted);

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
          this.userSelectedCurrency = selectedCurrency;
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

  getItemsDay(dateString: string) {
    return getItineraryDay(dateString);
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

  getHolidayPhotoSrc() {
    if (this.trip) {
      if (this.trip.googleDestination) {
        return this.trip.googleDestination.imageUrl;
      } else {
        return `../../../../assets/holiday${this.trip.photoNumber}-min.jpg`;
      }
    }
    return `../../../../assets/holiday2-min.jpg`;
  }

  navigateToItemDetails(item: IItineraryItem) {
    this.itineraryStore.dispatch(getItemDetailsPage({ item: item }));
    this.router.navigateByUrl(
      `trip-details/${item.tripId}/event/${item.itemId}`
    );
  }

  goBack() {
    this.router.navigateByUrl(`trips/`);
  }

  deleteTrip() {
    if (this.trip) {
      this.store.dispatch(
        deleteTripFromFirestore({
          userEmail: this.trip.userEmail,
          tripId: this.trip.tripId,
        })
      );
    }
  }

  ngOnDestory() {
    this.tripSubscription.unsubscribe();
    this.totalCostSubscription.unsubscribe();
    this.itinerarySubscription.unsubscribe();
    this.selectedCurrencySubscription.unsubscribe();
  }
}
