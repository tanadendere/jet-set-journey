import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { ITrip } from '../../tripManagement/models/trip';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPlaceSearchResult } from '../../models/placesAPI';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);

  addTrip(
    userEmail: string,
    tripName: string,
    destination: IPlaceSearchResult | string
  ): Observable<void> {
    return from(
      addDoc(
        collection(
          this.firestore,
          `${environment.collectionNames.usersCollection}/${userEmail}/${environment.collectionNames.tripsCollection}`
        ),
        {
          tripName: tripName,
          destination: JSON.stringify(destination),
          photoNumber: Math.floor(Math.random() * 10) + 1,
        }
      )
        .then((response) => {
          return;
        })
        .catch((error) => console.error('Error adding the trip: ', error))
    );
  }

  getTrips(userEmail: string): Observable<ITrip[]> {
    return from(
      getDocs(
        collection(
          this.firestore,
          `${environment.collectionNames.usersCollection}/${userEmail}/${environment.collectionNames.tripsCollection}`
        )
      ).then((response) => {
        let trips: ITrip[] = [];
        response.forEach((doc) => {
          const tripData = doc.data() as ITrip;
          const trip: ITrip = {
            tripId: doc.id,
            tripName: tripData.tripName,
            destination: tripData.destination,
            userEmail: userEmail,
            photoNumber: tripData.photoNumber,
          };
          trips.push(trip);
        });
        return trips;
      })
    );
  }
}
