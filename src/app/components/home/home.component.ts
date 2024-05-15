import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItineraryState, TripState, UserState } from '../../models/state';
import { selectUser } from '../../userManagement/store/selectors';
import { logoutUser } from '../../userManagement/store/actions';
import { AddTripComponent } from './add-trip/add-trip.component';
import { Subscription } from 'rxjs';
import { getTripsFromFirestore } from '../../userDashboard/store/actions';
import { selectTrips } from '../../userDashboard/store/selectors';
import { TripCardComponent } from '../../userDashboard/components/trip-card/trip-card.component';
import { ITrip } from '../../tripManagement/models/trip';
import { getTripDetailsPage } from '../../tripManagement/store/actions';
import { CurrencySelectionComponent } from '../../userManagement/components/currency-selection/currency-selection.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    AddTripComponent,
    TripCardComponent,
    CurrencySelectionComponent,
    HeaderComponent,
  ],
})
export class HomeComponent {
  userStore: Store<UserState> = inject(Store);
  user$ = this.userStore.select(selectUser);
  userSubscription = new Subscription();

  tripStore: Store<TripState> = inject(Store);
  trips$ = this.tripStore.select(selectTrips);

  itineraryStore: Store<ItineraryState> = inject(Store);

  router = inject(Router);

  timeOfDay = this.getTimeOfDay();

  constructor() {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.tripStore.dispatch(
          getTripsFromFirestore({ userEmail: user.email })
        );
      }
    });
  }

  getTimeOfDay() {
    const date = new Date();
    const time = date.getHours();

    if (time < 12) return 'morning';
    else if (time < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  }

  toggleTripForm(submissionStatus: boolean) {
    const form = document.getElementById('add-trip-form');
    if (form) {
      if (submissionStatus) {
        form.style.display = 'none';
      } else {
        form.style.display = 'block';
      }
    }
  }

  navigateToTripDetails(trip: ITrip) {
    this.itineraryStore.dispatch(getTripDetailsPage({ trip: trip }));
    this.router.navigateByUrl(`trip-details/${trip.tripId}`);
  }

  ngOnDestory() {
    this.userSubscription.unsubscribe;
  }
}
