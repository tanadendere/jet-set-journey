import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

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
    // TO-DO:
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
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];
