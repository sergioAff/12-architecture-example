import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DishPageComponent } from '../../components/dish-page/dish-page.component';
import { AsyncPipe } from '@angular/common';
import { GetAllDishesUseCase } from '../../../../application/get-all-dishes.usecase';
import { Observable, Subscription, interval } from 'rxjs';
import { IDish } from '../../../../domain/model/dish';
import { switchMap } from 'rxjs/operators';
import { DeleteDishUseCase } from '../../../../application/delete-dish.usecase';

@Component({
  selector: 'lib-list-dishes',
  imports: [DishPageComponent, AsyncPipe],
  templateUrl: './list-dishes.component.html',
})
export class ListDishesComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllDishesUseCase);
  private readonly _useCaseDelete = inject(DeleteDishUseCase);
  public dishes$: Observable<IDish[]>;
  private intervalSubscription: Subscription;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.dishes$ = this._useCase.dishes$();

    this.intervalSubscription = interval(100)
      .pipe(switchMap(async () => this._useCase.execute()))
      .subscribe();
  }

  onRequestDelete(dishId: number): void {
    this._useCaseDelete.initSubscription();
    this._useCaseDelete.execute(dishId);
    this._useCaseDelete.destroySubscription();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
