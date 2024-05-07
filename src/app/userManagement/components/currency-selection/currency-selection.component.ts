import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { selectCurrencies, selectCurrency } from '../../store/selectors';
import { getCurrencyList, selectUserCurrency } from '../../store/actions';
import { ICurrency } from '../../models/currency';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-selection.component.html',
  styleUrl: './currency-selection.component.scss',
})
export class CurrencySelectionComponent {
  userStore: Store<UserState> = inject(Store);
  currencies$ = this.userStore.select(selectCurrencies);
  selectedCurrency$ = this.userStore.select(selectCurrency);
  selectedCurrencySubscription = new Subscription();
  selectedCurrencyCode = 'ZAR';

  constructor() {
    this.userStore.dispatch(getCurrencyList());

    this.selectedCurrencySubscription = this.selectedCurrency$.subscribe(
      (selectedCurrency) => {
        if (selectedCurrency) {
          this.selectedCurrencyCode = selectedCurrency.code;
        }
      }
    );
  }

  onSelectCurrency(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedCurrency: ICurrency = JSON.parse(target.value);
    this.userStore.dispatch(
      selectUserCurrency({ selectedCurrency: selectedCurrency })
    );
  }

  stringfy(currency: ICurrency) {
    return JSON.stringify(currency);
  }

  ngOnDestroy() {
    this.selectedCurrencySubscription.unsubscribe();
  }
}
