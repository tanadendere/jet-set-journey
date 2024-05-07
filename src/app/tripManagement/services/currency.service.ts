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

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  itemName: string = 'CurrencyList';

  // getCurrencyList(): Observable<ICurrencyAPIObj> {
  //   return from(this.currencyAPICaller());
  // }

  async currencyAPICaller(): Promise<ICurrencyAPIObj> {
    const client = new currencyapi(environment.currencyAPI);
    return await client.currencies();
  }

  // getInternalCurrencyList() {
  //   return this.http.get<ICurrencyAPIObj>('assets/currencies.json');
  // }

  storeCurrencyList(currencyListResult: ICurrencyAPIObj) {
    const storedCurrencyDataString = localStorage.getItem(this.itemName);
    if (storedCurrencyDataString) {
    }

    const currencyData: ICurrencyListDataToStore = {
      currencyData: currencyListResult,
      expirationTime: Date.now() + 10800000, // three hours from now
    };

    const currencyDataString = JSON.stringify(currencyData);
    localStorage.setItem(this.itemName, currencyDataString);
  }

  retrieveCurrencyList(): Observable<ICurrencyAPIObj> {
    const storedCurrencyDataString = localStorage.getItem(this.itemName);
    if (storedCurrencyDataString) {
      const currencyData: ICurrencyListDataToStore = JSON.parse(
        storedCurrencyDataString
      );

      if (Date.now() > currencyData.expirationTime)
        return from(this.currencyAPICaller());

      return of(currencyData.currencyData);
    }
    return from(this.currencyAPICaller());
  }

  constructor(private http: HttpClient) {}
}
