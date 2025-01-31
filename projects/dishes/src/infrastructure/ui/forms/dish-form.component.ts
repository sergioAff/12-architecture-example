import { Component, Input } from '@angular/core';
import { IDish } from '../../../domain/model/dish';
import { CustomFormComponent, FormTitleComponent } from 'shared';

@Component({
  selector: 'lib-dish-form',
  imports: [FormTitleComponent, CustomFormComponent],
  templateUrl: './dish-form.component.html',
})
export class DishFormComponent {
  @Input() dishId: number | null = null;
  @Input() formData: IDish | null = null;
  @Input() submitAction!: (data: IDish) => void;

  formConfig = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      errorMessage: 'Name is required.',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      errorMessage: 'Price is required.',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text-area',
      errorMessage: 'Description is required.',
    },
    {
      name: 'isPopular',
      label: 'Is Popular',
      type: 'checkbox',
      errorMessage: 'Is Popular is required.',
    },
    {
      name: 'isAvailable',
      label: 'Is Available',
      type: 'checkbox',
      errorMessage: 'Is Available is required.',
    },
  ];
}
