import { inject, Injectable } from '@angular/core';
import { DeleteCustomerService } from '../infrastructure/services/delete-customer.service';
import { CustomerState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ICustomer } from '../domain/model/customer';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerUseCase {
  private readonly _service = inject(DeleteCustomerService);
  private readonly _state = inject(CustomerState);
  private subscriptions: Subscription = new Subscription();

  customer$(): Observable<ICustomer[]> {
    return this._state.customers.customers.$();
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
          tap(() => {
            const currentCustomers = this._state.customers.customers.snapshot();
            const updatedCustomers = currentCustomers.filter(
              (customer) => customer.id !== id
            );
            this._state.customers.customers.set(updatedCustomers);
          })
        )
        .subscribe()
    );
  }
}
