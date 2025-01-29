import { inject, Injectable } from '@angular/core';
import { EditMenuService } from '../infrastructure/services/edit-menu.service';
import { MenuState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenuResonse } from '../domain/model/menuResponse';

@Injectable({
  providedIn: 'root',
})
export class EditMenuUseCase {
  private readonly _service = inject(EditMenuService);
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

  execute(id: number, menu: Partial<IMenuResonse>): void {
    this.subscriptions.add(
      this._service
        .execute(id, menu)
        .pipe(
          tap((updatedMenu: IMenuResonse) => {
            const currentMenus = this._state.menus.menus.snapshot();
            const updatedMenus = currentMenus.map((m) =>
              m.id === id ? { ...m, ...updatedMenu } : m
            );
            this._state.menus.menus.set(updatedMenus);
          })
        )
        .subscribe()
    );
  }
}
