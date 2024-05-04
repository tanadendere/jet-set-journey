import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TripState, UserState } from '../../models/state';
import { selectUser } from '../../userManagement/store/selectors';
import { logoutUser } from '../../userManagement/store/actions';
import { AddTripComponent } from './add-trip/add-trip.component';
import { Subscription } from 'rxjs';
import { getTripsFromFirestore } from '../../userDashboard/store/actions';
import { selectTrips } from '../../userDashboard/store/selectors';
import { TripCardComponent } from '../../userDashboard/components/trip-card/trip-card.component';

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
  ],
})
export class HomeComponent {
  userStore: Store<UserState> = inject(Store);
  user$ = this.userStore.select(selectUser);
  userSubscription = new Subscription();

  tripStore: Store<TripState> = inject(Store);
  trips$ = this.tripStore.select(selectTrips);

  router = inject(Router);

  ngOnInit() {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.tripStore.dispatch(
          getTripsFromFirestore({ userEmail: user.email })
        );
      }
    });
  }

  navigateToTripDetails(tripId: string) {
    this.router.navigateByUrl(`trip-details/${tripId}`);
  }

  logout(): void {
    this.userStore.dispatch(logoutUser());
    this.userSubscription.unsubscribe();
  }
}
