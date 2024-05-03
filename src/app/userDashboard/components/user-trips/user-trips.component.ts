import { Component } from '@angular/core';
import { AddTripComponent } from './add-trip/add-trip.component';

@Component({
  selector: 'app-user-trips',
  standalone: true,
  templateUrl: './user-trips.component.html',
  styleUrl: './user-trips.component.scss',
  imports: [AddTripComponent],
})
export class UserTripsComponent {
  constructor() {}
}
