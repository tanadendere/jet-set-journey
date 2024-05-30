import { IPlaceSearchResult } from '../../models/placesAPI';

export interface IItineraryItem {
  itemId?: string;
  itineraryName: string;
  tripId: string;
  tag: string;
  startDateTime: string;
  endDateTime: string;
  currency: string;
  costEstimate: number;
  location: string;
  notes: string;
  googleDestination?: IPlaceSearchResult;
}

// Tags
// 'Place to stay'
// 'Food and drink'
// 'Outdoor Activity'
// 'Indoor Activity'
// 'Sight Seeing'
// 'Shopping'
// 'Visiting friends and family'
// 'Relaxation'
// 'Travel'
// 'Occasion'
// 'Event'
// 'Culture'
