import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItemState, UserState } from '../../models/state';
import { selectUser } from '../../userManagement/store/selectors';
import { HeaderComponent } from '../../components/header/header.component';
import { selectItem } from './store/selector';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss',
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent],
})
export class ItemDetailComponent {
  userStore: Store<UserState> = inject(Store);
  user$ = this.userStore.select(selectUser);

  itemStore: Store<ItemState> = inject(Store);

  item$ = this.itemStore.select(selectItem);

  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
