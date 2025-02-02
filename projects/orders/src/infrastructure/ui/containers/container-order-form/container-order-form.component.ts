import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CreateOrderUseCase } from '../../../../application/create-order.usecase';
import { EditOrderUseCase } from '../../../../application/edit-order.usecase';
import { GetOrderUseCase } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderResponse } from '../../../../domain/model/orderResponse';
import { Observable, of } from 'rxjs';
import { GetALlReservationUseCase, IReservationResponse } from 'reservations';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { GetAllDishesUseCase, IDish } from 'dishes';

@Component({
  selector: 'lib-container-order-form',
  imports: [OrderFormComponent, AsyncPipe],
  templateUrl: './container-order-form.component.html',
})
export class ContainerOrderFormComponent implements OnInit, OnDestroy {
  private readonly _addOrderUseCase = inject(CreateOrderUseCase);
  private readonly _editOrderUseCase = inject(EditOrderUseCase);
  private readonly _getOrderByIdUseCase = inject(GetOrderUseCase);
  private readonly _getReservationsUseCase = inject(GetALlReservationUseCase);
  private readonly _getDishesUseCase = inject(GetAllDishesUseCase);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public _orderId: number | null = null;
  public _reservations: Observable<IReservationResponse[]> = of([]);
  public _dishes: Observable<IDish[]> = of([]);
  public _formData: Observable<IOrderResponse | null> = of(null);

  ngOnInit(): void {
    this._addOrderUseCase.initSubscription();
    this._editOrderUseCase.initSubscription();
    this._getOrderByIdUseCase.initSubscription();
    this._getReservationsUseCase.initSubscription();
    this._getDishesUseCase.initSubscription();

    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._orderId = +id;
        this.loadOrderData(this._orderId);
      }
    });

    this.loadReservations();
    this.loadDishes();
  }

  ngOnDestroy(): void {
    this._addOrderUseCase.destroySubscription();
    this._editOrderUseCase.destroySubscription();
    this._getOrderByIdUseCase.destroySubscription();
    this._getReservationsUseCase.destroySubscription();
    this._getDishesUseCase.destroySubscription();
  }

  loadOrderData(id: number): void {
    this._getOrderByIdUseCase.execute(id);
    this.loadDishes();
    this._formData = this._getOrderByIdUseCase.orders$(id);
  }

  loadReservations(): void {
    this._getReservationsUseCase.execute();
    this._reservations = this._getReservationsUseCase.reservation$();
  }

  loadDishes(): void {
    this._getDishesUseCase.execute();
    this._dishes = this._getDishesUseCase.dishes$();
  }

  submitAction(data: IOrderResponse): void {
    if (this._orderId) {
      this._editOrderUseCase.execute(this._orderId, data);
    } else {
      this._addOrderUseCase.execute(data);
    }
    this._router.navigate(['/orders']);
  }
}
