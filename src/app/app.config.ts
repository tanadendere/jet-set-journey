import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  metaReducers,
  reducers,
  userFeatureKey,
  userManagementReducers,
} from './userManagement/store/reducers';
import { UserManagementEffects } from './userManagement/store/effects';
import { UserDashboardEffects } from './userDashboard/store/effects';
import {
  userDashboardFeatureKey,
  userDashboardReducers,
} from './userDashboard/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideStore(reducers, { metaReducers }),
    provideState({ name: userFeatureKey, reducer: userManagementReducers }),
    provideState({
      name: userDashboardFeatureKey,
      reducer: userDashboardReducers,
    }),
    provideEffects(UserManagementEffects, UserDashboardEffects),
  ],
};
