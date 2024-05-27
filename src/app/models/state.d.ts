import { ICurrency, ICurrencyData } from '../userManagement/models/currency';
import { IItineraryItem } from '../eventManagement/models/itinerary';
import { ITrip } from '../tripManagement/models/trip';
import { IUser } from '../userManagement/models/user';
import { IExchangeRate } from '../tripManagement/models/exchangeRate';

export interface UserState {
  user?: IUser;
  selectedCurrency?: ICurrency;
  currencyData?: ICurrencyData;
  errorMessage?: string;
}

export interface TripState {
  trips?: ITrip[];
}

export interface ItineraryState {
  trip?: ITrip;
  itinerary?: IItineraryItem[];
  exchangeRates?: IExchangeRate[];
}

export interface ItemState {
  item?: IItineraryItem;
  deleted: boolean;
}
