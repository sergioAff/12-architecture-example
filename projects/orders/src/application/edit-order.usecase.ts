import { inject, Injectable } from '@angular/core';
import { OrderState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrderResponse } from '../domain/model/orderResponse';
import { EditOrderService } from '../infrastructure/services/edit-order.service';

@Injectable({
  providedIn: 'root',
})
export class EditOrderUseCase {
  private readonly _service = inject(EditOrderService);
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

  execute(id: number, order: Partial<IOrderResponse>): void {
    this.subscriptions.add(
      this._service
        .execute(id, order)
        .pipe(
          tap((updatedOrder: IOrderResponse) => {
            const currentOrders = this._state.orders.orders.snapshot();
            const updatedOrders = currentOrders.map((c) =>
              c.id === id ? { ...c, ...updatedOrder } : c
            );
            this._state.orders.orders.set(updatedOrders);
          })
        )
        .subscribe()
    );
  }
}
