import { Injectable, inject } from '@angular/core';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITrip } from '../../tripManagement/models/trip';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);

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
