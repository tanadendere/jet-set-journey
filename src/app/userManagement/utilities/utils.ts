import { ICurrencyAPIObj, ICurrency, ICurrencyData } from '../models/currency';

export function getListOfCurrencies(currencyData: ICurrencyData): ICurrency[] {
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

  const listOfCurrencies: ICurrency[] = [];

  // Iterate through the ICurrencyData object
  for (const currencyCode in currencyData) {
    if (currencyData.hasOwnProperty(currencyCode)) {
      const currency: ICurrency =
        currencyData[currencyCode as keyof ICurrencyData];
      listOfCurrencies.push(currency);
    }
  }

  // Now currencyArray contains all the ICurrency objects
  return listOfCurrencies;
}
