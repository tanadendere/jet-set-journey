import { Injectable, inject } from '@angular/core';
import { collection, addDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { IUser } from '../models/user';
import {} from '../app.config';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);

  async addUser(user: IUser) {
    const docRef = await addDoc(
      collection(this.firestore, environment.collectionNames.usersCollection),
      {
        email: user.email,
        name: user.name,
        password: user.password,
        surname: user.surname,
        userId: user.userId,
      }
    )
      .then((response) => {
        console.log('Document written with ID: ', response.id);
      })
      .catch((error) => console.error('Error adding document: ', error));
  }

  constructor() {}
}
