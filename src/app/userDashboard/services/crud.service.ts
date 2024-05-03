import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  docData,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { ITrip } from '../models/trip';
import { EMPTY, Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);

  addTrip(
    userEmail: string,
    tripName: string,
    tripDestination: string
  ): Observable<void> {
    console.log(
      `${environment.collectionNames.usersCollection}/${userEmail}/${environment.collectionNames.tripsCollection}`
    );
    return from(
      addDoc(
        collection(
          this.firestore,
          `${environment.collectionNames.usersCollection}/${userEmail}/${environment.collectionNames.tripsCollection}`
        ),
        {
          tripName: tripName,
          tripDestination: tripDestination,
        }
      )
        .then((response) => {
          return;
        })
        .catch((error) => console.error('Error adding the trip: ', error))
    );

    // console.log(`${environment.collectionNames.usersCollection}/${userEmail}`);
    // const newTripRef = collection(
    //   this.firestore,
    //   `${environment.collectionNames.usersCollection}/${userEmail}/${environment.collectionNames.tripsCollection}`
    // ));
    // return from(docRef);
  }

  deleteTrip(userEmail: string, tripId: string): Observable<void> {
    return from(
      deleteDoc(
        doc(
          this.firestore,
          `${environment.collectionNames.usersCollection}/${userEmail}/${environment.collectionNames.tripsCollection}`,
          tripId
        )
      )
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
          };
          trips.push(trip);
        });
        return trips;
      })
    );
  }
}
