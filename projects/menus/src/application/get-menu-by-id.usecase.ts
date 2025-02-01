import { inject, Injectable } from '@angular/core';
import { GetMenuByIdService } from '../infrastructure/services/get-menu-by-id.service';
import { MenuState } from '../domain/state';
import { map, Observable, Subscription, tap } from 'rxjs';
import { IMenuResonse } from '../domain/model/menuResponse';

@Injectable({
  providedIn: 'root',
})
export class GetMenuByIdUseCase {
  private readonly _service = inject(GetMenuByIdService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  menu$(id: number): Observable<IMenuResonse> {
    return this._state.menus.menus
      .$()
      .pipe(
        map((menus: IMenuResonse[]) =>
          menus.find((menu: IMenuResonse) => menu.id === id)
        )
      );
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): Observable<IMenuResonse> {
    return this._service.execute(id).pipe(
      tap((updateMenu: IMenuResonse) => {
        const currentMenus = this._state.menus.menus.snapshot();
        const updatedMenus = currentMenus.map((m) =>
          m.id === id ? updateMenu : m
        );
        this._state.menus.menus.set(updatedMenus);
      })
    );
  }
}
