import { ITrip } from '../userDashboard/models/trip';
import { IUser } from '../userManagement/guards/models/user';

export interface UserState {
  user?: IUser;
}

export interface TripState {
  trips?: ITrip[];
}
