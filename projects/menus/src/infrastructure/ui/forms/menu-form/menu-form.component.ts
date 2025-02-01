import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomFormComponent, FormTitleComponent } from 'shared';
import { IMenuResonse } from '../../../../domain/model/menuResponse';
import { IDish } from 'dishes';

@Component({
  selector: 'lib-menu-form',
  imports: [FormTitleComponent, CustomFormComponent],
  templateUrl: './menu-form.component.html',
})
export class MenuFormComponent implements OnChanges {
  @Input() menuId: number | null;
  @Input() formData: IMenuResonse | null;
  @Input() dishes: IDish[] = [];
  @Input() submitAction!: (data: IMenuResonse) => void;

  formConfig: {
    name: string;
    label: string;
    type?: string;
    errorMessage?: string;
    options?: { label: string; value: number }[];
  }[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      errorMessage: 'Name is required.',
    },
    {
      name: 'dishIds',
      label: 'Dishes',
      type: 'array',
      errorMessage: 'At least one dish is required.',
      options: [],
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dishes'] && this.dishes) {
      this.formConfig.find((config) => config.name === 'dishIds')!.options =
        this.dishes.map((dish) => ({
          label: dish.name,
          value: dish.id,
        }));
    }
  }
}
