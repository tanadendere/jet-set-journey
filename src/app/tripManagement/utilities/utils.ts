import { IExchangeRateData, IExchangeRate } from '../models/exchangeRate';
import { IItineraryItem } from '../models/itinerary';

export function getCurrencyCodes(itinerary: IItineraryItem[]) {
  const currencyCodes: string[] = [];
  for (const item of itinerary) {
    if (!currencyCodes.includes(item.currency)) {
      if (item.currency !== '') {
        currencyCodes.push(item.currency);
      }
    }
  }
  return currencyCodes;
}

export function getListOfExhangeRates(
  exchangeRateData: IExchangeRateData
): IExchangeRate[] {
  const listOfExhangeRates: IExchangeRate[] = [];

  for (const exchangeRate in exchangeRateData) {
    if (exchangeRateData.hasOwnProperty(exchangeRate)) {
      const rate: IExchangeRate =
        exchangeRateData[exchangeRate as keyof IExchangeRateData];
      listOfExhangeRates.push(rate);
    }
  }

  return listOfExhangeRates;
}

export function calculateItineraryTotalCost(
  itinerary: IItineraryItem[],
  exchangeRates: IExchangeRate[]
) {
  let totalCost = 0.0;
  for (const item of itinerary) {
    const rate = getExchangeRate(item.currency, exchangeRates);
    totalCost += item.costEstimate / rate;
  }
  return totalCost;
}

function getExchangeRate(
  currencyCode: string,
  exchangeRates: IExchangeRate[]
): number {
  for (const exchangeRate of exchangeRates) {
    if (currencyCode === exchangeRate.code) {
      return exchangeRate.value;
    }
  }
  return 0;
}

export function sortItinerary(itinerary: IItineraryItem[]) {
  let sortedItinerary = [...itinerary].sort((a, b) => {
    const aDate = new Date(a.startDateTime);
    const bDate = new Date(b.startDateTime);
    if (aDate < bDate) {
      return -1;
    } else if (aDate > bDate) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedItinerary;
}
