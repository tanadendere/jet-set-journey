import { ICurrency, ICurrencyData } from '../models/currency';

export function getListOfCurrencies(currencyData: ICurrencyData): ICurrency[] {
  const listOfCurrencies: ICurrency[] = [];

  for (const currencyCode in currencyData) {
    if (currencyData.hasOwnProperty(currencyCode)) {
      const currency: ICurrency =
        currencyData[currencyCode as keyof ICurrencyData];
      listOfCurrencies.push(currency);
    }
  }
  return listOfCurrencies;
}
