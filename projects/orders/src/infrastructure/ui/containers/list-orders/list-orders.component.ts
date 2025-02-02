import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrderPageComponent } from '../../components/order-page/order-page.component';
import { AsyncPipe } from '@angular/common';
import { GetAllOrderUseCase } from '../../../../application/get-all-order.usecase';
import { interval, Observable, Subscription, switchMap } from 'rxjs';
import { IOrderResponse } from '../../../../domain/model/orderResponse';
import { DeleteOrderUseCase } from '../../../../application/delete-order.usecase';

@Component({
  selector: 'lib-list-orders',
  imports: [OrderPageComponent, AsyncPipe],
  templateUrl: './list-orders.component.html',
})
export class ListOrdersComponent implements OnInit, OnDestroy {
  public readonly _useCase = inject(GetAllOrderUseCase);
  public readonly _deleteOrderUseCase = inject(DeleteOrderUseCase);
  public orders$: Observable<IOrderResponse[]>;
  private intervalSubscription: Subscription;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.orders$ = this._useCase.orders$();
    this.intervalSubscription = interval(100)
      .pipe(switchMap(async () => this._useCase.execute()))
      .subscribe();
  }

  onRequestDelete(orderId: number): void {
    this._deleteOrderUseCase.initSubscription();
    this._deleteOrderUseCase.execute(orderId);
    this._deleteOrderUseCase.destroySubscription();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
