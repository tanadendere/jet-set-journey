import { ICurrency, ICurrencyData } from '../../userManagement/models/currency';
import { IExchangeRateData, IExchangeRate } from '../models/exchangeRate';
import { IItineraryItem } from '../models/itinerary';

export function getCurrencyCodes(itinerary: IItineraryItem[]) {
  let currencyCodes: string[] = [];
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
  // for(const currency of currencies) {

  // }
  // for (const key in currencies) {
  //     if (currencies.hasOwnProperty(key)) {
  //       const item = currencies[];
  //       console.log('Key:', key);
  //       console.log('Name:', item.name);
  //       console.log('Description:', item.description);
  //     }
  //   }

  const listOfExhangeRates: IExchangeRate[] = [];

  // Iterate through the ICurrencyData object
  for (const exchangeRate in exchangeRateData) {
    if (exchangeRateData.hasOwnProperty(exchangeRate)) {
      const rate: IExchangeRate =
        exchangeRateData[exchangeRate as keyof IExchangeRateData];
      listOfExhangeRates.push(rate);
    }
  }

  // Now currencyArray contains all the ICurrency objects
  return listOfExhangeRates;
}

export function calculateItineraryTotalCost(
  itinerary: IItineraryItem[],
  exchangeRates: IExchangeRate[]
) {
  let totalCost = 0.0;
  for (const item of itinerary) {
    const rate = getExchangeRate(item.currency, exchangeRates);
    totalCost += item.costEstimate * rate;
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
