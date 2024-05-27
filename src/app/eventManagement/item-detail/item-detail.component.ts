import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItemState, ItineraryState, UserState } from '../../models/state';
import { selectUser } from '../../userManagement/store/selectors';
import { HeaderComponent } from '../../components/header/header.component';
import { checkIfItemDeleted, selectItem } from './store/selector';
import { Location } from '@angular/common';
import { selectTripDetails } from '../../tripManagement/store/selectors';
import { Subscription } from 'rxjs';
import { ITrip } from '../../tripManagement/models/trip';
import { deleteItineraryItemFromFirestore } from './store/actions';
import { IItineraryItem } from '../models/itinerary';

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
  item: IItineraryItem | undefined = undefined;
  itemSubscription = new Subscription();

  deleted$ = this.itemStore.select(checkIfItemDeleted);

  location = inject(Location);

  tripStore: Store<ItineraryState> = inject(Store);
  trip$ = this.tripStore.select(selectTripDetails);
  trip: ITrip | undefined = undefined;
  tripSubscription = new Subscription();

  constructor() {
    this.tripSubscription = this.trip$.subscribe((trip) => {
      if (trip) {
        this.trip = trip;

        this.itemSubscription = this.item$.subscribe((item) => {
          this.item = item;
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  deleteItem() {
    if (this.trip && this.item?.itemId) {
      this.itemStore.dispatch(
        deleteItineraryItemFromFirestore({
          trip: this.trip,
          itineraryItemId: this.item.itemId,
        })
      );
    } else {
      alert(
        'That item cannot be deleted. Please try again or take it as a sign 😉'
      );
    }
  }

  ngOnDestory() {
    this.itemSubscription.unsubscribe;
    this.tripSubscription.unsubscribe;
  }
}
