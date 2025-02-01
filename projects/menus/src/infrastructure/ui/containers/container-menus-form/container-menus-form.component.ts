import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';
import { AsyncPipe } from '@angular/common';
import { CreateMenuUseCase } from '../../../../application/create-menu.usecase';
import { EditMenuUseCase } from '../../../../application/edit-menu.usecase';
import { GetMenuByIdUseCase } from '../../../../public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IMenuResonse } from '../../../../domain/model/menuResponse';
import { CustomFormComponent } from 'shared';
import { IDish } from 'dishes';
import { GetDishesForMenuUseCase } from '../../../../application/get-dishes-for-menu.usecase';

@Component({
  selector: 'lib-container-menus-form',
  imports: [MenuFormComponent, AsyncPipe],
  templateUrl: './container-menus-form.component.html',
})
export class ContainerMenusFormComponent implements OnInit, OnDestroy {
  private readonly _addMenuUseCase = inject(CreateMenuUseCase);
  private readonly _editMenuUseCase = inject(EditMenuUseCase);
  public readonly _getMenuUseCase = inject(GetMenuByIdUseCase);
  private readonly _getDishesUseCase = inject(GetDishesForMenuUseCase);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public _menuId: number | null = null;
  public _dishes: Observable<IDish[]> = of([]);
  public _formData: Observable<IMenuResonse | null> = of(null);

  ngOnInit(): void {
    this._addMenuUseCase.initSubscription();
    this._editMenuUseCase.initSubscription();
    this._getMenuUseCase.initSubscription();
    this._getDishesUseCase.initSubscription();
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._menuId = +id;
        this.loadMenuData(this._menuId);
      }
    });
    this.loadDishes();
  }

  ngOnDestroy(): void {
    this._getMenuUseCase.destroySubscription();
    this._editMenuUseCase.destroySubscription();
    this._getMenuUseCase.destroySubscription();
    this._getDishesUseCase.destroySubscription();
  }

  loadMenuData(id: number): void {
    this._getMenuUseCase.execute(id);
    this._formData = this._getMenuUseCase.menu$(id);
    this.updateFormData();
  }

  loadDishes(): void {
    this._getDishesUseCase.execute();
    this._dishes = this._getDishesUseCase.dishes$();
    console.log(this._dishes);
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
      'lib-menu-form'
    ) as unknown as CustomFormComponent;
    return formComponent ? formComponent : null;
  }

  submitAction(data: IMenuResonse): void {
    if (this._menuId) {
      this._editMenuUseCase.execute(this._menuId, data);
      this.reloadAndNavigate();
    } else {
      this._addMenuUseCase.execute(data);
      this.reloadAndNavigate();
    }
  }

  private reloadAndNavigate(): void {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/menus']);
    });
  }
}
