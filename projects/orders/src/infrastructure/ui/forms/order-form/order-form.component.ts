import { Component, Input } from '@angular/core';
import { IOrderResponse } from '../../../../domain/model/orderResponse';
import { CustomFormComponent, FormTitleComponent } from 'shared';

@Component({
  selector: 'lib-order-form',
  imports: [FormTitleComponent, CustomFormComponent],
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent {
  @Input() formData: IOrderResponse | null;
  @Input() orderId: number | null;
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
}
