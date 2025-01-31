import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrderPageComponent } from '../../components/order-page/order-page.component';
import { AsyncPipe } from '@angular/common';
import { GetAllOrderUseCase } from '../../../../application/get-all-order.usecase';
import { Observable } from 'rxjs';
import { IOrderResponse } from '../../../../domain/model/orderResponse';

@Component({
  selector: 'lib-list-orders',
  imports: [OrderPageComponent, AsyncPipe],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss',
})
export class ListOrdersComponent implements OnInit, OnDestroy {
  public readonly _useCase = inject(GetAllOrderUseCase);
  public orders$: Observable<IOrderResponse[]>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAllOrders();
    this.orders$ = this._useCase.orders$();
  }

  getAllOrders(): void {
    this._useCase.execute();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }
}
