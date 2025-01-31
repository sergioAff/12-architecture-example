import { inject, Injectable } from '@angular/core';
import { GetDishService } from '../infrastructure/services/get-dish.service';
import { DishState } from '../domain/state';
import { map, Observable, Subscription, tap } from 'rxjs';
import { IDish } from '../domain/model/dish';

@Injectable({
  providedIn: 'root',
})
export class GetDishByIdUseCase {
  private readonly _service = inject(GetDishService);
  private readonly _state = inject(DishState);
  private subscriptions: Subscription = new Subscription();

  dish$(id: number): Observable<IDish> {
    return this._state.dishes.dishes
      .$()
      .pipe(
        map((dishes: IDish[]) => dishes.find((dish: IDish) => dish.id === id))
      );
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap((updatedDish: IDish) => {
            const currentDishes = this._state.dishes.dishes.snapshot();
            const updatedDishes = currentDishes.map((d) =>
              d.id === id ? updatedDish : d
            );
            this._state.dishes.dishes.set(updatedDishes);
          })
        )
        .subscribe()
    );
  }
}
