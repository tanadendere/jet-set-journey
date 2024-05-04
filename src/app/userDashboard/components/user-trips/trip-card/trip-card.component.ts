import { Component, Input, inject } from '@angular/core';
import { ITrip } from '../../../models/trip';
import { TripState } from '../../../../models/state';
import { Store } from '@ngrx/store';
import { deleteTripFromFirestore } from '../../../store/actions';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss',
})
export class TripCardComponent {
  @Input()
  trip: ITrip = {} as ITrip;
  store: Store<TripState> = inject(Store);

  deleteTrip() {
    this.store.dispatch(
      deleteTripFromFirestore({
        userEmail: this.trip.userEmail,
        tripId: this.trip.tripId,
      })
    );
  }
}
