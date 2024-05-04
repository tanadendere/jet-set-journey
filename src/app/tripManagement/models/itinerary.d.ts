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

export enum Tag {
  placeToStay = 'Place to stay',
  foodAndDrink = 'Food and drink',
  activityOutdoor = 'Outdoor Activity',
  activityIndoor = 'Indoor Activity',
  sightSeeing = 'Sight Seeing',
  relaxation = 'Relaxation',
  travel = 'Travel',
  occasion = 'Occasion',
  event = 'Event',
  culture = 'Culture',
}
