import { Component, Input, SimpleChanges } from '@angular/core';
import { IOrderResponse } from '../../../../domain/model/orderResponse';
import { CustomFormComponent, FormTitleComponent } from 'shared';
import { IReservationResponse } from 'reservations';
import { IDish } from 'dishes';

@Component({
  selector: 'lib-order-form',
  imports: [FormTitleComponent, CustomFormComponent],
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent {
  @Input() formData: IOrderResponse | null;
  @Input() orderId: number | null;
  @Input() reservations: IReservationResponse[] = [];
  @Input() dishes: IDish[] = [];
  @Input() submitAction!: (data: IOrderResponse) => void;

  formConfig: {
    name: string;
    label: string;
    type?: string;
    errorMessage?: string;
    options?: { label: string; value: number | string }[];
  }[] = [
    {
      name: 'reservationId',
      label: 'Reservation ID',
      type: 'select',
      errorMessage: 'Reservation ID is required.',
      options: [],
    },
    {
      name: 'dishIds',
      label: 'dishes',
      type: 'array',
      errorMessage: 'At least one dish is required.',
      options: [],
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reservations']) {
      this.formConfig[0].options = this.reservations.map((reservation) => ({
        label: reservation.id.toString(),
        value: reservation.id,
      }));
    }
    if (changes['dishes']) {
      this.formConfig[1].options = this.dishes.map((dish) => ({
        label: dish.name,
        value: dish.id,
      }));
    }
  }
}
