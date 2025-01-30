import { inject, Injectable } from '@angular/core';
import { DeleteMenuService } from '../infrastructure/services/delete-menu.service';
import { MenuState } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenuResonse } from '../domain/model/menuResponse';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuUseCase {
  private readonly _service = inject(DeleteMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  menus$(): Observable<IMenuResonse[]> {
    return this._state.menus.menus.$();
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
            const currentMenus = this._state.menus.menus.snapshot();
            const updatedMenus = currentMenus.filter((menu) => menu.id !== id);
            this._state.menus.menus.set(updatedMenus);
          })
        )
        .subscribe()
    );
  }
}
