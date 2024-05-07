import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IExchangeRateRoot } from '../models/exchangeRate';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  latestExchangeRate(selectedCurrency: string, itemCurrencies: string[]) {
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
