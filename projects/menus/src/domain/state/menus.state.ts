import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IMenuResonse } from '../model/menuResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenusState {
  private readonly _factory = inject(StateFactory);
  private readonly _menus = new BehaviorSubject<IMenuResonse[]>([]);

  store() {
    return {
      menus: this._factory.state(this._menus),
    };
  }
}
