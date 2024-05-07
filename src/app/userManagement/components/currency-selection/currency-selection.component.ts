import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserState } from '../../../models/state';
import { Store } from '@ngrx/store';
import { selectCurrencies } from '../../store/selectors';
import { getCurrencyList, selectUserCurrency } from '../../store/actions';
import { ICurrency } from '../../models/currency';

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

  constructor() {
    this.userStore.dispatch(getCurrencyList());
    // const currencySelection = document.querySelector(
    //   '#currencySelection'
    // ) as HTMLSelectElement;
    // const selectedCurrency: ICurrency = JSON.parse(currencySelection.value);
    // console.log(selectedCurrency);
    // this.userStore.dispatch(
    //   selectUserCurrency({ selectedCurrency: selectedCurrency })
    // );
  }

  onSelectCurrency(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedCurrency: ICurrency = JSON.parse(target.value);
    console.log(selectedCurrency);
    this.userStore.dispatch(
      selectUserCurrency({ selectedCurrency: selectedCurrency })
    );
  }

  stringfy(currency: ICurrency) {
    return JSON.stringify(currency);
  }
}
