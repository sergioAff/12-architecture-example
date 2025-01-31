import { inject, Injectable } from '@angular/core';
import { UpdateDishService } from '../infrastructure/services/update-dish.service';
import { DishState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IDish } from '../domain/model/dish';

@Injectable({
  providedIn: 'root',
})
export class EditDishUseCase {
  private readonly _service = inject(UpdateDishService);
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

  execute(id: number, dish: Partial<IDish>): void {
    this.subscriptions.add(
      this._service
        .execute(id, dish)
        .pipe(
          tap((updatedDish: IDish) => {
            const currentDishes = this._state.dishes.dishes.snapshot();
            const updatedDishes = currentDishes.map((d) =>
              d.id === id ? { ...d, ...updatedDish } : d
            );
            this._state.dishes.dishes.set(updatedDishes);
          })
        )
        .subscribe()
    );
  }
}
