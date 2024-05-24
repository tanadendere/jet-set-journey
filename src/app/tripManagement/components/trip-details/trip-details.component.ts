import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ItineraryState, UserState } from '../../../models/state';
import { Store } from '@ngrx/store';
import {
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
  addItineraryItemToFirestore,
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
import { getItemDetailsPage } from '../../../eventManagement/item-detail/store/actions';

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
  stylingForHolidayPhoto = '';

  router = inject(Router);

  totalCost$ = this.itineraryStore.select(selectTotalCost);
  totalCostSubscription = new Subscription();
  totalCost = 0;

  itineraryDates$ = this.itineraryStore.select(selectItineraryDates);
  itineraryDatesSubscription = new Subscription();

  constructor() {
    this.tripSubscription = this.trip$.subscribe((trip) => {
      if (trip) {
        this.trip = trip;
        this.itineraryStore.dispatch(
          getItineraryItemsFromFirestore({ trip: trip })
        );
        this.stylingForHolidayPhoto = `backgroundImage: url(${this.getHolidayPhotoSrc(
          trip.photoNumber
        )})`;
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

  getHolidayPhotoSrc(photoNumber: number | undefined) {
    if (photoNumber) {
      return `../../../../assets/holiday${photoNumber}-min.jpg`;
    }
    return `../../../../assets/holiday${10}-min.jpg`;
  }

  navigateToItemDetails(item: IItineraryItem) {
    this.itineraryStore.dispatch(getItemDetailsPage({ item: item }));
    this.router.navigateByUrl(
      `trip-details/${item.tripId}/event/${item.itemId}`
    );
  }

  ngOnDestory() {
    this.tripSubscription.unsubscribe();
    this.totalCostSubscription.unsubscribe();
    this.itinerarySubscription.unsubscribe();
    this.selectedCurrencySubscription.unsubscribe();
  }
}
