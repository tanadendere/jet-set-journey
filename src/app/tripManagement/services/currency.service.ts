import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ICurrencyAPIObj, ICurrency } from '../models/currency';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import currencyapi from '@everapi/currencyapi-js';

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
    return this.http.get<ICurrencyAPIObj>('curriencies.json');
  }

  constructor(private http: HttpClient) {}
}
