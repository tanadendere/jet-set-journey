import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../../models/state';
import { selectUser } from '../../userManagement/store/selectors';
import { logoutUser } from '../../userManagement/store/actions';
import { UserTripsComponent } from '../../userDashboard/components/user-trips/user-trips.component';
import { AddTripComponent } from './add-trip/add-trip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    UserTripsComponent,
    AddTripComponent,
  ],
})
export class HomeComponent {
  store: Store<UserState> = inject(Store);
  user$ = this.store.select(selectUser);
  logout(): void {
    this.store.dispatch(logoutUser());
  }
}
