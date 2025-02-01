import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CreateOrderUseCase } from '../../../../application/create-order.usecase';
import { EditOrderUseCase } from '../../../../application/edit-order.usecase';
import { GetOrderUseCase } from '../../../../application/get-order.usecase';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderResponse } from '../../../../domain/model/orderResponse';
import { CustomFormComponent } from 'shared';
import { Observable, of } from 'rxjs';
import { GetALlReservationUseCase, IReservationResponse } from 'reservations';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { GetAllDishesUseCase, IDish } from 'dishes';

@Component({
  selector: 'lib-container-order-form',
  imports: [OrderFormComponent, AsyncPipe],
  templateUrl: './container-order-form.component.html',
})
export class ContainerOrderFormComponent {
  private readonly _addOrderUseCase = inject(CreateOrderUseCase);
  private readonly _editOrderUseCase = inject(EditOrderUseCase);
  public readonly _getOrderUseCase = inject(GetOrderUseCase);
  private readonly _getAllReservationUseCase = inject(GetALlReservationUseCase);
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
    this._getOrderUseCase.initSubscription();
    this._getDishesUseCase.initSubscription();
    this._getAllReservationUseCase.initSubscription();

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
    this._getOrderUseCase.destroySubscription();
    this._editOrderUseCase.destroySubscription();
    this._getDishesUseCase.destroySubscription();
    this._getOrderUseCase.destroySubscription();
    this._getAllReservationUseCase.destroySubscription();
  }

  loadOrderData(id: number): void {
    this._getOrderUseCase.execute(id);
    this._formData = this._getOrderUseCase.orders$(id);
    this.updateFormData();
  }

  loadReservations(): void {
    this._getAllReservationUseCase.execute();
    this._reservations = this._getAllReservationUseCase.reservation$();
  }

  loadDishes(): void {
    this._getDishesUseCase.execute();
    this._dishes = this._getDishesUseCase.dishes$();
  }

  updateFormData(): void {
    if (this._formData) {
      const formComponent = this.getFormComponent();
      if (formComponent) {
        formComponent.formGroup.patchValue(this._formData);
      }
    }
  }

  getFormComponent(): CustomFormComponent | null {
    const formComponent = document.querySelector(
      'lib-order-form'
    ) as unknown as CustomFormComponent;
    return formComponent ? formComponent : null;
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
