import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddTripComponent } from '../../../components/home/add-trip/add-trip.component';
import { UserState, TripState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { selectTrips } from '../../store/selectors';
import { TripCardComponent } from './trip-card/trip-card.component';
import { getTripsFromFirestore } from '../../store/actions';
import { selectUser } from '../../../userManagement/store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-trips',
  standalone: true,
  templateUrl: './user-trips.component.html',
  styleUrl: './user-trips.component.scss',
  imports: [CommonModule, AddTripComponent, TripCardComponent],
})
export class UserTripsComponent {
  store: Store<TripState> = inject(Store);
  trips$ = this.store.select(selectTrips);

  userStore: Store<UserState> = inject(Store);
  user$ = this.userStore.select(selectUser);
  userSubscription = new Subscription();

  ngOnInit() {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user != undefined) {
        this.store.dispatch(getTripsFromFirestore({ userEmail: user.email }));
      }
    });
  }

  ngOnDestory() {
    this.userSubscription.unsubscribe();
  }
}
