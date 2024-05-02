import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/state';
import { selectUser } from '../../store/selectors';
import { Observable } from 'rxjs';
import { loginUser, logoutUser } from '../../store/actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'jet-set-journey';
  authService = inject(AuthService);
  store: Store<AppState> = inject(Store);

  // @Input() user: IUser | null | undefined;
  user$: Observable<IUser | undefined> = this.store.select(selectUser);
  logout(): void {
    this.store.dispatch(logoutUser());
  }
}