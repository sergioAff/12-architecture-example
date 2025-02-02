import { inject, Injectable } from '@angular/core';
import { GetOrderByIdService } from '../infrastructure/services/get-order-by-id.service';
import { OrderState } from '../domain/state';
import { map, Observable, Subscription, tap } from 'rxjs';
import { IOrderResponse } from '../domain/model/orderResponse';

@Injectable({ providedIn: 'root' })
export class GetOrderUseCase {
  private readonly _service = inject(GetOrderByIdService);
  private readonly _state = inject(OrderState);
  private subscriptions: Subscription = new Subscription();

  orders$(id: number): Observable<IOrderResponse> {
    return this._state.orders.orders
      .$()
      .pipe(
        map((orders: IOrderResponse[]) =>
          orders.find((order: IOrderResponse) => order.id === id)
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
          tap((updatedOrder: IOrderResponse) => {
            const currentOrders = this._state.orders.orders.snapshot();
            const updatedOrders = currentOrders.map((order) =>
              order.id === id ? updatedOrder : order
            );
            this._state.orders.orders.set(updatedOrders);
          })
        )
        .subscribe()
    );
  }
}
