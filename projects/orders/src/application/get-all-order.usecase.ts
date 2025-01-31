import { inject, Injectable } from '@angular/core';
import { GetAllOrdersService } from '../infrastructure/services/get-all-orders.service';
import { OrderState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrderResponse } from '../domain/model/orderResponse';

@Injectable({
  providedIn: 'root',
})
export class GetAllOrderUseCase {
  private readonly _service = inject(GetAllOrdersService);
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

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((orders: IOrderResponse[]) =>
            this._state.orders.orders.set(orders)
          )
        )
        .subscribe()
    );
  }
}
