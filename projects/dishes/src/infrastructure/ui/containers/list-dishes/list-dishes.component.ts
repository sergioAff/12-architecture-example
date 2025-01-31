import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DishPageComponent } from '../../components/dish-page/dish-page.component';
import { AsyncPipe } from '@angular/common';
import { GetAllDishesUseCase } from '../../../../application/get-all-dishes.usecase';
import { Observable } from 'rxjs';
import { IDish } from '../../../../domain/model/dish';

@Component({
  selector: 'lib-list-dishes',
  imports: [DishPageComponent, AsyncPipe],
  templateUrl: './list-dishes.component.html',
})
export class ListDishesComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllDishesUseCase);
  public dishes$: Observable<IDish[]>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAllDishes();
    this.dishes$ = this._useCase.dishes$();
  }

  getAllDishes(): void {
    this._useCase.execute();
  }
  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }
}
