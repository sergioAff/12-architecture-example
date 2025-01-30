import { inject, Injectable } from '@angular/core';
import { GetAllMenuService } from '../infrastructure/services/get-all-menu.service';
import { MenuState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenuResonse } from '../domain/model/menuResponse';

@Injectable({
  providedIn: 'root',
})
export class GetAllMenuUseCase {
  private readonly _service = inject(GetAllMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  menus$(): Observable<IMenuResonse[]> {
    return this._state.menus.menus.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }
  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((menus: IMenuResonse[]) => this._state.menus.menus.set(menus))
        )
        .subscribe()
    );
  }
}
