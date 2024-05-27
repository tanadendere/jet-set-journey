import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ITrip } from '../../../tripManagement/models/trip';
import { TripState } from '../../../models/state';
import { Store } from '@ngrx/store';
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

  getHolidayPhotoSrc() {
    return `../../../../assets/holiday${this.trip.photoNumber}-min.jpg`;
  }

  onTripClick() {
    this.tripClicked.emit(this.trip);
  }
}
