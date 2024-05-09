import { Injectable } from '@angular/core';
import { ICurrencyAPIObj } from '../models/currency';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  getCurrencyList() {
    return this.http.get<ICurrencyAPIObj>(
      `https://api.currencyapi.com/v3/currencies?apikey=${environment.currencyAPI}`
    );
  }

  getInternalCurrencyList() {
    return this.http.get<ICurrencyAPIObj>('assets/currencies.json');
  }

  constructor(private http: HttpClient) {}
}
