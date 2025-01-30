import { inject, Injectable } from '@angular/core';
import { DeleteDishService } from '../infrastructure/services/delete-dish.service';
import { DishState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IDish } from '../domain/model/dish';

@Injectable({
  providedIn: 'root',
})
export class DeleteDishUseCase {
  private readonly _service = inject(DeleteDishService);
  private readonly _state = inject(DishState);
  private subscriptions: Subscription = new Subscription();

  dishes$(): Observable<IDish[]> {
    return this._state.dishes.dishes.$();
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
          tap(() => {
            const currentDishes = this._state.dishes.dishes.snapshot();
            const updatedDishes = currentDishes.filter(
              (dish) => dish.id !== id
            );
            this._state.dishes.dishes.set(updatedDishes);
          })
        )
        .subscribe()
    );
  }
}
