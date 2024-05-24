import { Component, Input, inject } from '@angular/core';
import { ItineraryState } from '../../../../models/state';
import { Store } from '@ngrx/store';
import { deleteItineraryItemFromFirestore } from '../../../store/actions';
import { IItineraryItem } from '../../../models/itinerary';
import { selectTripDetails } from '../../../store/selectors';
import { Subscription } from 'rxjs';
import { ITrip } from '../../../models/trip';

@Component({
  selector: 'app-itinerary-item',
  standalone: true,
  imports: [],
  templateUrl: './itinerary-item.component.html',
  styleUrl: './itinerary-item.component.scss',
})
export class ItineraryItemComponent {
  store: Store<ItineraryState> = inject(Store);
  @Input() item: IItineraryItem = {} as IItineraryItem;

  trip$ = this.store.select(selectTripDetails);
  trip: ITrip | undefined = undefined;
  tripSubscription = new Subscription();

  constructor() {
    this.tripSubscription = this.trip$.subscribe((trip) => {
      if (trip) {
        this.trip = trip;
      }
    });
  }

  getTime(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return formattedHours + ':' + formattedMinutes;
  }

  deleteItem() {
    if (this.trip && this.item.itemId) {
      this.store.dispatch(
        deleteItineraryItemFromFirestore({
          trip: this.trip!,
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
    this.tripSubscription.unsubscribe();
  }
}
