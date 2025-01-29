import { inject, Injectable } from '@angular/core';
import { CreateMenuService } from '../infrastructure/services/create-menu.service';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenuResonse } from '../domain/model/menuResponse';
import { MenuState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuUseCase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  menu$(): Observable<IMenuResonse[]> {
    return this._state.menus.menus.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }
  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IMenuResonse): void {
    this.subscriptions.add(
      this._service
        .execute(menu)
        .pipe(
          tap((newMenu: IMenuResonse) => {
            const currentMenus = this._state.menus.menus.snapshot();
            this._state.menus.menus.set([...currentMenus, newMenu]);
          })
        )
        .subscribe()
    );
  }
}
