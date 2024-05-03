import { Component, Input } from '@angular/core';
import { ITrip } from '../../../models/trip';

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
}
