import { Routes } from '@angular/router';
import { RegisterComponent } from './userManagement/components/register/register.component';
import { LoginComponent } from './userManagement/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './userManagement/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [AuthGuard],
  },
  {
    path: 'trips',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    // TO-DO: create the trip component
    // children: [
    //   {
    //     path: 'trip-details/:id',
    //     component: TripComponent,
    //     canDeactivate: [AuthGuard],
    //   },
    // ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    // TO-DO: change this to NotFoundPage
    redirectTo: 'login',
  },
];
