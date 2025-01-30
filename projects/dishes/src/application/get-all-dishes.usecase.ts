import { inject, Injectable } from '@angular/core';
import { DishState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IDish } from '../domain/model/dish';
import { GetAllDishesService } from '../infrastructure/services/get-all-dishes.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllDishesUseCase {
  private readonly _service = inject(GetAllDishesService);
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

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(tap((dishes: IDish[]) => this._state.dishes.dishes.set(dishes)))
        .subscribe()
    );
  }
}
