import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  getAllDataFromLocalForage,
  default as localForage,
} from 'ngrx-store-persist';
import { tripManagementFeatureKey } from './app/tripManagement/store/reducer';
import { userDashboardFeatureKey } from './app/userDashboard/store/reducer';
import { userFeatureKey } from './app/userManagement/store/reducer';
import { itemManagementFeatureKey } from './app/eventManagement/store/reducer';

getAllDataFromLocalForage({
  driver: localForage.INDEXEDDB,
  keys: [
    userFeatureKey,
    userDashboardFeatureKey,
    tripManagementFeatureKey,
    itemManagementFeatureKey,
  ],
}).then(() => {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
});
