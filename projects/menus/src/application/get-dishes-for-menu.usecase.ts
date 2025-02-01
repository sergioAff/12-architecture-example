import { inject, Injectable } from '@angular/core';
import { GetDishesForMenuService } from '../infrastructure/services/get-dishes-for-menu.service';
import { MenuState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IDish } from 'dishes';

@Injectable({
  providedIn: 'root',
})
export class GetDishesForMenuUseCase {
  private readonly _service = inject(GetDishesForMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  dishes$(): Observable<IDish[]> {
    return this._state.menus.dishesForMenu.$();
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
        .pipe(
          tap((dishes: IDish[]) => this._state.menus.dishesForMenu.set(dishes))
        )
        .subscribe()
    );
  }
}
