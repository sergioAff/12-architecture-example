import { inject, Injectable } from '@angular/core';
import { StateFactory } from '@shared/domain/state/state.factory';
import { BehaviorSubject } from 'rxjs';
import { IDish } from '../model/dish';

@Injectable({
  providedIn: 'root',
})
export class DishesState {
  private readonly _factory = inject(StateFactory);
  private readonly _dishes = new BehaviorSubject<IDish[]>([]);

  store() {
    return {
      dishes: this._factory.state(this._dishes),
    };
  }
}
