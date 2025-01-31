import { Component, Input } from '@angular/core';
import { FormTitleComponent } from 'shared';
import { CustomFormComponent } from 'shared';
import { ICustomer } from '../../../domain/model/customer';

@Component({
  selector: 'lib-customer-form',
  imports: [FormTitleComponent, CustomFormComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  @Input() customerId: number | null = null;
  @Input() formData: ICustomer | null = null;
  @Input() submitAction!: (data: ICustomer) => void;

  formConfig = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      errorMessage: 'First Name is required.',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      errorMessage: 'Last Name is required.',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      errorMessage: 'Email is required.',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      errorMessage: 'Phone is required.',
    },
  ];
}
