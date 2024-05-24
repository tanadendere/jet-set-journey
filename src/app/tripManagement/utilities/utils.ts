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

export function getItineraryDates(itinerary: IItineraryItem[]) {
  const sortedItinerary = sortItinerary(itinerary);
  let dates: string[] = [];
  for (const item of sortedItinerary) {
    const day = getItineraryDay(item.startDateTime);
    if (!dates.includes(day)) {
      dates.push(day);
    }
  }
  return dates;
}

export function getItineraryDay(dateString: string) {
  const date = new Date(dateString);
  const day = getDayOfWeek(date.getDay());
  const numberDate = date.getDate();
  const month = getMonthName(date.getMonth());
  return day + ', ' + numberDate + ' ' + month;
}

function getDayOfWeek(day: number) {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}

function getMonthName(monthNumber: number) {
  switch (monthNumber) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
}
