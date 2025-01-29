import { inject, Injectable } from '@angular/core';
import { CustomersState } from './customers.state';

@Injectable({
  providedIn: 'root',
})
export class CustomerState {
  private readonly _customers = inject(CustomersState);

  get customers() {
    return this._customers.store();
  }
}
