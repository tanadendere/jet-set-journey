import { ITrip } from '../userDashboard/models/trip';
import { IUser } from '../userManagement/models/user';

export interface AppState {
  user?: IUser;
}

export interface TripState {
  trips?: ITrip[];
}
