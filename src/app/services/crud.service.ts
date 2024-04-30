import { Injectable, inject } from '@angular/core';
import { collection } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { IUser } from '../models/user';
import { Firestore, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);

  addUser(user: IUser): Observable<void> {
    return from(
      setDoc(
        doc(
          this.firestore,
          environment.collectionNames.usersCollection,
          user.email
        ),
        {
          email: user.email,
          name: user.name,
          password: user.password,
          surname: user.surname,
          userId: user.userId,
        }
      ).catch((error) => console.error('Error adding user: ', error))
    );
  }

  getUser(userEmail: string): Observable<IUser> {
    return from(
      getDocs(
        collection(this.firestore, environment.collectionNames.usersCollection)
      ).then((response) => {
        let user: IUser = {} as IUser;
        response.forEach((doc) => {
          if (doc.id === userEmail) {
            user = doc.data() as IUser;
          }
        });
        return user;
      })
    );
  }
}
