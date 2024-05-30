import { IPlaceSearchResult } from '../../models/placesAPI';

export interface ITrip {
  tripId: string;
  tripName: string;
  destination: string;
  userEmail: string;
  photoNumber?: number;
  googleDestination?: IPlaceSearchResult;
}
