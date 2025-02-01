import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DishFormComponent } from '../../forms/dish-form.component';
import { AsyncPipe } from '@angular/common';
import { CreateDishUseCase } from '../../../../application/create-dish.usecase';
import { EditDishUseCase } from '../../../../application/edit-dish.usecase';
import { GetDishByIdUseCase } from '../../../../application/get-dish-by-id.usecase';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomFormComponent } from 'shared';
import { IDish } from '../../../../public-api';

@Component({
  selector: 'lib-container-dish-form',
  imports: [DishFormComponent, AsyncPipe],
  templateUrl: './container-dish-form.component.html',
})
export class ContainerDishFormComponent implements OnInit, OnDestroy {
  private readonly _addDishUseCase = inject(CreateDishUseCase);
  private readonly _editDishUseCase = inject(EditDishUseCase);
  private readonly _getDishUseCase = inject(GetDishByIdUseCase);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public _dishId: number | null = null;
  public _formData: Observable<IDish | null> = of(null);

  ngOnInit(): void {
    this._addDishUseCase.initSubscription();
    this._editDishUseCase.initSubscription();
    this._getDishUseCase.initSubscription();

    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._dishId = +id;
        this.loadDishData(this._dishId);
      }
    });
  }

  ngOnDestroy(): void {
    this._getDishUseCase.destroySubscription();
    this._editDishUseCase.destroySubscription();
    this._getDishUseCase.destroySubscription();
  }

  loadDishData(id: number): void {
    this._getDishUseCase.execute(id);
    this._formData = this._getDishUseCase.dish$(id);
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
      'lib-dish-form'
    ) as unknown as CustomFormComponent;
    return formComponent ? formComponent : null;
  }

  submitAction(data: IDish): void {
    if (this._dishId) {
      this._editDishUseCase.execute(this._dishId, data);
      this.reloadAndNavigate();
    } else {
      this._addDishUseCase.execute(data);
      this.reloadAndNavigate();
    }
  }

  private reloadAndNavigate(): void {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/dishes']);
    });
  }
}
