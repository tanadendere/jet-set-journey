import { Location, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItemState, ItineraryState, UserState } from '../../models/state';
import { selectUser } from '../../userManagement/store/selectors';
import { HeaderComponent } from '../../components/header/header.component';
import { checkIfItemDeleted, selectItem } from '../store/selector';
import { selectTripDetails } from '../../tripManagement/store/selectors';
import { Subscription } from 'rxjs';
import { ITrip } from '../../tripManagement/models/trip';
import { deleteItineraryItemFromFirestore } from '../store/actions';
import { IItineraryItem } from '../models/itinerary';
import {
  getItineraryDayWithYear,
  getItineryTime,
} from '../../tripManagement/utilities/utils';

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

  getItemsDetailedStartAndEnd(startDateString: string, endDateString: string) {
    let detailedDuration = '';
    const startDay = getItineraryDayWithYear(startDateString);
    const endDay = getItineraryDayWithYear(endDateString);

    const startTime = getItineryTime(startDateString);
    const endTime = getItineryTime(endDateString);

    if (startDay === endDay) {
      detailedDuration =
        startDay + '</br>' + 'from ' + startTime + ' to ' + endTime;
    } else {
      detailedDuration =
        'From ' +
        startDay +
        ' at ' +
        startTime +
        '\n' +
        'to ' +
        endDay +
        ' at ' +
        endTime;
    }
    return detailedDuration;
  }

  deleteItem() {
    if (this.trip && this.item?.itemId) {
      this.itemStore.dispatch(
        deleteItineraryItemFromFirestore({
          trip: this.trip,
          itineraryItemId: this.item.itemId,
        })
      );
    }
  }

  ngOnDestory() {
    this.itemSubscription.unsubscribe;
    this.tripSubscription.unsubscribe;
  }
}
