import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDish } from '../../../../../../dishes/src/domain/model/dish';
import { EditMenuUseCase } from '../../../../../../menus/src/application/edit-menu.usecase';

@Component({
  selector: 'lib-control-input',
  imports: [],
  templateUrl: './control-input.component.html',
  styleUrl: './control-input.component.css',
})
export class ControlInputComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() config!: {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    errorMessage?: string;
    options?: { label: string; value: any }[];
  };
  @Input() menuId!: number | null;
  @Input() orderId!: number | null;

  dishes: IDish[] = [];

  private editMenu = inject(EditMenuUseCase);
  private getMe;

  ngOnInit(): void {
    if (this.config.name === 'dishIds' && this.menuId) {
      this.loadMenuDishes(this.menuId);
    } else if (this.config.name === 'dishIds' && this.orderId) {
      this.loadOrderDishes(this.orderId);
    }
  }

  get control(): FormControl | FormArray {
    return this.formGroup.get(this.config.name) as FormControl | FormArray;
  }

  get isArray(): boolean {
    return this.control instanceof FormArray;
  }

  loadMenuDishes(menuId: number): void {
    this.editMenu.execute(menuId).subscribe((menu) => {
      this.dishes = menu.dishes;
      this.updateDishOptions();
    });
  }

  loadOrderDishes(orderId: number): void {
    this.editOrderService.getOrder(orderId).subscribe((order) => {
      this.dishes = order.dishes;
      this.updateDishOptions();
    });
  }

  updateDishOptions(): void {
    if (this.config.name === 'dishIds') {
      this.config.options = this.dishes.map((dish) => ({
        label: dish.name,
        value: dish.id,
      }));

      const dishIdsArray = this.control as FormArray;
      dishIdsArray.clear();

      this.dishes.forEach((dish) => {
        dishIdsArray.push(new FormControl(dish.id, Validators.required));
      });
    }
  }

  addItem(value: any): void {
    if (this.control instanceof FormArray) {
      this.control.push(new FormControl(value, Validators.required));
    }
  }

  removeItem(index: number): void {
    if (this.control instanceof FormArray) {
      this.control.removeAt(index);
    }
  }

  getFormArrayControls(): FormControl[] {
    return (this.control as FormArray).controls as FormControl[];
  }

  ngOnDestroy(): void {
    this.editMenu.destroySubscription();
  }
}
