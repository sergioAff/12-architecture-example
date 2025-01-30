import { inject, Injectable } from '@angular/core';
import { StateFactory } from '@shared/domain/state/state.factory';
import { IOrderResponse } from '../model/orderResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersState {
  private readonly _factory = inject(StateFactory);
  private readonly _orders = new BehaviorSubject<IOrderResponse[]>([]);

  store() {
    return {
      menus: this._factory.state(this._orders),
    };
  }
}
