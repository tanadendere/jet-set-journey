import { Component, Input, inject } from '@angular/core';
import { IUser } from '../../../userManagement/models/user';
import { CurrencySelectionComponent } from '../../../userManagement/components/currency-selection/currency-selection.component';
import { UserState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../../userManagement/store/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CurrencySelectionComponent],
})
export class HeaderComponent {
  userStore: Store<UserState> = inject(Store);

  @Input()
  user: IUser | undefined | null = undefined;

  logout(): void {
    this.userStore.dispatch(logoutUser());
  }
}
