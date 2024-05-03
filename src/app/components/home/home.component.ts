import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../userManagement/models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/state';
import { selectUser } from '../../userManagement/store/selectors';
import { Observable } from 'rxjs';
import { logoutUser } from '../../userManagement/store/actions';
import { UserTripsComponent } from '../../userDashboard/components/user-trips/user-trips.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, UserTripsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  store: Store<AppState> = inject(Store);
  user$: Observable<IUser | undefined> = this.store.select(selectUser);
  logout(): void {
    this.store.dispatch(logoutUser());
  }
}
