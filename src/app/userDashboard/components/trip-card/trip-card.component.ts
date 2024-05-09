import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ITrip } from '../../../tripManagement/models/trip';
import { TripState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { deleteTripFromFirestore } from '../../store/actions';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss',
})
export class TripCardComponent {
  @Input() trip: ITrip = {} as ITrip;
  @Output() tripClicked: EventEmitter<ITrip> = new EventEmitter<ITrip>();
  store: Store<TripState> = inject(Store);

  onTripClick() {
    this.tripClicked.emit(this.trip);
  }

  deleteTrip() {
    this.store.dispatch(
      deleteTripFromFirestore({
        userEmail: this.trip.userEmail,
        tripId: this.trip.tripId,
      })
    );
  }
}
