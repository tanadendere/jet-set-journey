import { ICurrency, ICurrencyData } from '../userManagement/models/currency';
import { IItineraryItem } from '../tripManagement/models/itinerary';
import { ITrip } from '../userDashboard/models/trip';
import { IUser } from '../userManagement/models/user';

export interface UserState {
  user?: IUser;
  selectedCurrency?: ICurrency;
  currencyData?: ICurrencyData;
}

export interface TripState {
  trips?: ITrip[];
}

export interface ItineraryState {
  trip?: ITrip;
  itinerary?: IItineraryItem[];
  // currencyData?: ICurrencyData;
}
