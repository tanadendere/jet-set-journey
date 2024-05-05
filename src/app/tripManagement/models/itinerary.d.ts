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
}

// Tags
// 'Place to stay'
// 'Food and drink'
// 'Outdoor Activity'
// 'Indoor Activity'
// 'Sight Seeing'
// 'Visiting friends and family'
// 'Relaxation'
// 'Travel'
// 'Occasion'
// 'Event'
// 'Culture'
