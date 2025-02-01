import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomFormComponent, FormTitleComponent } from 'shared';
import { IReservationResponse } from '../../../../domain/model/reservation.interface';
import { ICustomer } from 'customers';

@Component({
  selector: 'lib-reservation-form',
  imports: [FormTitleComponent, CustomFormComponent],
  templateUrl: './reservation-form.component.html',
})
export class ReservationFormComponent implements OnChanges {
  @Input() formData: IReservationResponse | null;
  @Input() reservationId: number | null;
  @Input() customers: ICustomer[] = [];
  @Input() submitAction!: (data: IReservationResponse) => void;

  formConfig = [
    {
      name: 'customerId',
      label: 'Customer',
      type: 'select',
      options: [],
      errorMessage: 'Customer is required.',
    },
    {
      name: 'time',
      label: 'Time',
      type: 'datetime-local',
      errorMessage: 'Time is required.',
    },
    {
      name: 'people',
      label: 'People',
      type: 'number',
      errorMessage: 'People is required.',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'Confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      errorMessage:
        'Status is required. Must be one of: pending, completed, cancelled.',
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customers'] && this.customers) {
      this.formConfig.find((config) => config.name === 'customerId')!.options =
        this.customers.map((customer) => ({
          label: customer.firstName + ' ' + customer.lastName,
          value: customer.id.toString(),
        }));
    }
  }
}
