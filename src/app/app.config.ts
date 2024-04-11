import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'jetsetjourney-tana',
          appId: '1:979818677665:web:38ba56547037510d4377e0',
          storageBucket: 'jetsetjourney-tana.appspot.com',
          apiKey: environment.HOLIDAY_PLANNER_API_KEY,
          authDomain: 'jetsetjourney-tana.firebaseapp.com',
          messagingSenderId: '979818677665',
          measurementId: 'G-6V1FTTCXMT',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
