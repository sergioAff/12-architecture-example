import { inject, Injectable } from '@angular/core';
import { CreateDishService } from '../infrastructure/services/create-dish.service';
import { DishState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IDish } from '../domain/model/dish';

@Injectable({
  providedIn: 'root',
})
export class CreateDishUseCase {
  private readonly _service = inject(CreateDishService);
  private readonly _state = inject(DishState);
  private subscriptions: Subscription = new Subscription();

  dish$(): Observable<IDish[]> {
    return this._state.dishes.dishes.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(dish: IDish): void {
    this.subscriptions.add(
      this._service
        .execute(dish)
        .pipe(
          tap((newDish: IDish) => {
            const currentDishes = this._state.dishes.dishes.snapshot();
            this._state.dishes.dishes.set([...currentDishes, newDish]);
          })
        )
        .subscribe()
    );
  }
}
