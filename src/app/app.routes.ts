import { Routes } from '@angular/router';
import { RegisterComponent } from './userManagement/components/register/register.component';
import { LoginComponent } from './userManagement/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './userManagement/guards/auth.guard';
import { TripDetailsComponent } from './tripManagement/components/trip-details/trip-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [AuthGuard],
  },
  {
    path: 'trips',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'trip-details/:tripId',
    component: TripDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'trips',
  },
  {
    path: '**',
    // TO-DO: change this to NotFoundPage
    redirectTo: 'login',
  },
];
