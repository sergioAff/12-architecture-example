import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuPageComponent } from '../../components/menu-page/menu-page.component';
import { GetAllMenuUseCase } from '../../../../application/get-all-menu.usecase';
import { Observable } from 'rxjs';
import { IMenuResonse } from '../../../../domain/model/menuResponse';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-list-menus',
  imports: [MenuPageComponent, AsyncPipe],
  templateUrl: './list-menus.component.html',
})
export class ListMenusComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllMenuUseCase);
  public menus$: Observable<IMenuResonse[]>;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.getAllMenus();
    this.menus$ = this._useCase.menus$();
  }

  getAllMenus(): void {
    this._useCase.execute();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }
}
