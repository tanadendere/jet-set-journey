import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AddTripComponent } from '../../../components/home/add-trip/add-trip.component';
import { TripState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { selectTrips } from '../../store/selectors';
import { TripCardComponent } from './trip-card/trip-card.component';

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
}
