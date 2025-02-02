import { inject, Injectable } from '@angular/core';
import { OrdersState } from 'shared';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrderResponse } from '../domain/model/orderResponse';
import { EditOrderService } from '../infrastructure/services/edit-order.service';

@Injectable({
  providedIn: 'root',
})
export class EditOrderUseCase {
  private readonly _service = inject(EditOrderService);
  private readonly _state = inject(OrdersState);
  private subscriptions: Subscription = new Subscription();

  orders$(): Observable<IOrderResponse[]> {
    return this._state.store().orders.$();
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
            alert('Order updated successfully');
            const currentOrders = this._state.store().orders.snapshot();
            const updatedOrders = currentOrders.map((c) =>
              c.id === id ? { ...c, ...updatedOrder } : c
            );
            this._state.store().orders.set(updatedOrders);
            alert('Order updated successfully');
          })
        )
        .subscribe({
          error: (err) => {
            console.error('Error updating order:', err);
          },
        })
    );
  }
}
