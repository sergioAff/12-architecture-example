import { inject, Injectable } from '@angular/core';
import { DeleteOrderService } from '../infrastructure/services/delete-order.service';
import { OrderState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrderResponse } from '../domain/model/orderResponse';

@Injectable({
  providedIn: 'root',
})
export class DeleteOrderUseCase {
  private readonly _service = inject(DeleteOrderService);
  private readonly _state = inject(OrderState);
  private subscriptions: Subscription = new Subscription();

  orders$(): Observable<IOrderResponse[]> {
    return this._state.orders.orders.$();
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
            const currentOrders = this._state.orders.orders.snapshot();
            const updatedOrders = currentOrders.filter(
              (order) => order.id !== id
            );
            this._state.orders.orders.set(updatedOrders);
          })
        )
        .subscribe()
    );
  }
}
