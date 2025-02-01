import { Component, inject } from '@angular/core';
import { ReservationFormComponent } from '../../forms/reservation-form/reservation-form.component';
import { AsyncPipe } from '@angular/common';
import { CreateReservationUseCase } from '../../../../application/create-reservation.usecase';
import { EditReservationUseCase } from '../../../../application/edit-reservation.usecase';
import { GetReservationUseCase } from '../../../../application/get-reservation.usecase';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IReservationResponse } from '../../../../domain/model/reservation.interface';
import { CustomFormComponent } from 'shared';
import { GetAllCustomerUseCase, ICustomer } from 'customers';

@Component({
  selector: 'lib-container-reservation-form',
  imports: [ReservationFormComponent, AsyncPipe],
  templateUrl: './container-reservation-form.component.html',
})
export class ContainerReservationFormComponent {
  private readonly _addReservationUseCase = inject(CreateReservationUseCase);
  private readonly _editReservationUseCase = inject(EditReservationUseCase);
  private readonly _getReservationUseCase = inject(GetReservationUseCase);
  private readonly _getAllCustomerUseCase = inject(GetAllCustomerUseCase);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public _reservationId: number | null = null;
  public _customers: Observable<ICustomer[]> = of([]);
  public _formData: Observable<IReservationResponse | null> = of(null);

  ngOnInit(): void {
    this._addReservationUseCase.initSubscription();
    this._editReservationUseCase.initSubscription();
    this._getReservationUseCase.initSubscription();
    this._getAllCustomerUseCase.initSubscription();

    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._reservationId = +id;
        this.loadReservationData(this._reservationId);
      }
    });
    this.loadCustomers();
  }

  ngOnDestroy(): void {
    this._getReservationUseCase.destroySubscription();
    this._editReservationUseCase.destroySubscription();
    this._getReservationUseCase.destroySubscription();
    this._getAllCustomerUseCase.destroySubscription();
  }

  loadCustomers(): void {
    this._getAllCustomerUseCase.execute();
    this._customers = this._getAllCustomerUseCase.customers$();
  }

  loadReservationData(id: number): void {
    this._getReservationUseCase.execute(id);
    this._formData = this._getReservationUseCase.reservations$(id);
    this.updateFormData();
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
      'lib-reservation-form'
    ) as unknown as CustomFormComponent;
    return formComponent ? formComponent : null;
  }

  submitAction(data: IReservationResponse): void {
    if (this._reservationId) {
      this._editReservationUseCase.execute(this._reservationId, data);
    } else {
      this._addReservationUseCase.execute(data);
    }
    this._router.navigate(['/reservations']);
  }
}
