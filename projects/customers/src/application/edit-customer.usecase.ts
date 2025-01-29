import { inject, Injectable } from '@angular/core';
import { EditCustomerService } from '../infrastructure/services/edit-customer.service';
import { CustomerState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ICustomer } from '../domain/model/customer';

@Injectable({
  providedIn: 'root',
})
export class EditCustomerUseCase {
  private readonly _service = inject(EditCustomerService);
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

  execute(id: number, customer: Partial<ICustomer>): void {
    this.subscriptions.add(
      this._service
        .execute(id, customer)
        .pipe(
          tap((updatedCustomer: ICustomer) => {
            const currentCustomers = this._state.customers.customers.snapshot();
            const updatedCustomers = currentCustomers.map((c) =>
              c.id === id ? { ...c, ...updatedCustomer } : c
            );
            this._state.customers.customers.set(updatedCustomers);
          })
        )
        .subscribe()
    );
  }
}
