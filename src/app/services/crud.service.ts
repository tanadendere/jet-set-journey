import { Injectable, inject } from '@angular/core';
import { collection } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { IUser } from '../models/user';
import { Firestore, doc, getDocs, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);

  async addUser(user: IUser) {
    await setDoc(
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
    ).catch((error) => console.error('Error adding document: ', error));
  }

  async getUser(userEmail: string): Promise<IUser> {
    return getDocs(
      collection(this.firestore, environment.collectionNames.usersCollection)
    ).then((response) => {
      let user: IUser = {} as IUser;
      response.forEach((doc) => {
        if (doc.id === userEmail) {
          user = doc.data() as IUser;
        }
      });
      return user;
    });
  }
}
