import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import {
  ICurrencyAPIObj,
  ICurrency,
  ICurrencyListDataToStore,
} from '../../userManagement/models/currency';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import currencyapi from '@everapi/currencyapi-js';
import { IExchangeRateRoot } from '../models/exchangeRate';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // latestExchangeRate(
  //   selectedCurrency: string,
  //   itemCurrencies: string[]
  // ): Observable<IExchangeRateRoot> {
  //   return this.currencyAPICaller(selectedCurrency, itemCurrencies);
  //   // return from(currencyapi
  //   //   .latest({
  //   //     base_currency: selectedCurrency,
  //   //     currencies: itemCurrency,
  //   //   })
  //   //   .then((response: { data: { [code: string]: { value: number } } }) => {
  //   //     const rate = response?.data[0]?.value;
  //   //     return rate;
  //   //   }));
  // }

  latestExchangeRate(selectedCurrency: string, itemCurrencies: string[]) {
    // const client = new currencyapi(environment.currencyAPI);
    // return await client.latest({
    //   base_currency: selectedCurrency,
    //   currencies: formatCurrenciesString(itemCurrencies),
    // });
    console.log(
      'formatted string',
      this.formatCurrenciesString(itemCurrencies)
    );
    console.log(
      'hello',
      `https://api.currencyapi.com/v3/latest?apikey=${
        environment.currencyAPI
      }&currencies=${this.formatCurrenciesString(
        itemCurrencies
      )}&base_currency=${selectedCurrency}`
    );

    return this.http.get<IExchangeRateRoot>(
      `https://api.currencyapi.com/v3/latest?apikey=${
        environment.currencyAPI
      }&currencies=${this.formatCurrenciesString(
        itemCurrencies
      )}&base_currency=${selectedCurrency}`
    );
  }

  formatCurrenciesString(itemCurrencies: string[]): string {
    return itemCurrencies.map((code) => encodeURIComponent(code)).join('%2C');
  }
  constructor(private http: HttpClient) {}
}
