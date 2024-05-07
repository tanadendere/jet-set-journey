import { Injectable } from '@angular/core';
import { ICurrencyAPIObj } from '../models/currency';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import currencyapi from '@everapi/currencyapi-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  getCurrencyList(): Observable<ICurrencyAPIObj> {
    return from(this.currencyAPICaller());
  }

  async currencyAPICaller(): Promise<ICurrencyAPIObj> {
    const client = new currencyapi(environment.currencyAPI);
    return await client.currencies();
  }

  getInternalCurrencyList() {
    return this.http.get<ICurrencyAPIObj>('assets/currencies.json');
  }

  constructor(private http: HttpClient) {}
}
