import { inject, Injectable } from '@angular/core';
import { CreateOrderService } from '../infrastructure/services/create-order.service';
import { OrderState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrderResponse } from '../domain/model/orderResponse';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderUseCase {
  private readonly _service = inject(CreateOrderService);
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

  execute(order: IOrderResponse): void {
    this.subscriptions.add(
      this._service
        .execute(order)
        .pipe(
          tap((newOrder: IOrderResponse) => {
            const currentOrders = this._state.orders.orders.snapshot();
            this._state.orders.orders.set([...currentOrders, newOrder]);
          })
        )
        .subscribe()
    );
  }
}
