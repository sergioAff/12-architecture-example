import { inject, Injectable } from '@angular/core';
import { map, Observable, Subscription, tap } from 'rxjs';
import { ICustomer } from '../domain/model/customer';
import { GetCustomerService } from '../infrastructure/services/get-customer.service';
import { CustomerState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class GetCustomerUseCase {
  private readonly _service = inject(GetCustomerService);
  private readonly _state = inject(CustomerState);
  private subscriptions: Subscription = new Subscription();

  customers$(id: number): Observable<ICustomer> {
    return this._state.customers.customers
      .$()
      .pipe(
        map((customers: ICustomer[]) =>
          customers.find((customer) => customer.id === id)
        )
      );
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap((updatedCustomer: ICustomer) => {
            const currentCustomers = this._state.customers.customers.snapshot();
            const updatedCustomers = currentCustomers.map((customer) =>
              customer.id === id ? updatedCustomer : customer
            );
            this._state.customers.customers.set(updatedCustomers);
          })
        )
        .subscribe()
    );
  }
}
