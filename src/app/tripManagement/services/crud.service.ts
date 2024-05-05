import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IItineraryItem } from '../models/itinerary';
import { ITrip } from '../../userDashboard/models/trip';
import {
  getDocs,
  collection,
  Firestore,
  addDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);

  getItineraryItems(trip: ITrip): Observable<IItineraryItem[]> {
    return from(
      getDocs(
        collection(
          this.firestore,
          `${environment.collectionNames.usersCollection}/${trip.userEmail}/${environment.collectionNames.tripsCollection}/${trip.tripId}/${environment.collectionNames.itineraryCollection}`
        )
      ).then((response) => {
        let itineraryItems: IItineraryItem[] = [];
        response.forEach((doc) => {
          const itemData = doc.data() as IItineraryItem;
          const itineraryItem: IItineraryItem = {
            itemId: doc.id,
            itineraryName: itemData.itineraryName,
            tripId: itemData.tripId,
            tag: itemData.tag,
            startDateTime: itemData.startDateTime,
            endDateTime: itemData.endDateTime,
            currency: itemData.currency,
            costEstimate: itemData.costEstimate,
            location: itemData.location,
            notes: itemData.notes,
          };
          itineraryItems.push(itineraryItem);
        });
        return itineraryItems;
      })
    );
  }

  addItineraryItem(
    trip: ITrip,
    itineraryItem: IItineraryItem
  ): Observable<void> {
    return from(
      addDoc(
        collection(
          this.firestore,
          `${environment.collectionNames.usersCollection}/${trip.userEmail}/${environment.collectionNames.tripsCollection}/${trip.tripId}/${environment.collectionNames.itineraryCollection}`
        ),
        itineraryItem
      )
        .then((response) => {
          return;
        })
        .catch((error) => console.error('Error adding the trip: ', error))
    );
  }

  deleteItineraryItem(trip: ITrip, itineraryItemId: string): Observable<void> {
    return from(
      deleteDoc(
        doc(
          this.firestore,
          `${environment.collectionNames.usersCollection}/${trip.userEmail}/${environment.collectionNames.tripsCollection}/${trip.tripId}/${environment.collectionNames.itineraryCollection}`,
          itineraryItemId
        )
      )
    );
  }
}
