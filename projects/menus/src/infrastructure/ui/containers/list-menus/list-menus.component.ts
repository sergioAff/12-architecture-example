import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuPageComponent } from '../../components/menu-page/menu-page.component';
import { GetAllMenuUseCase } from '../../../../application/get-all-menu.usecase';
import { interval, Observable, Subscription, switchMap } from 'rxjs';
import { IMenuResonse } from '../../../../domain/model/menuResponse';
import { AsyncPipe } from '@angular/common';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';

@Component({
  selector: 'lib-list-menus',
  imports: [MenuPageComponent, AsyncPipe],
  templateUrl: './list-menus.component.html',
})
export class ListMenusComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllMenuUseCase);
  private readonly _useCaseDelete = inject(DeleteMenuUseCase);
  public menus$: Observable<IMenuResonse[]>;
  private intervalSubscription: Subscription;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.menus$ = this._useCase.menus$();
    this.intervalSubscription = interval(100)
      .pipe(switchMap(async () => this._useCase.execute()))
      .subscribe();
  }

  onRequestDelete(menuId: number): void {
    this._useCaseDelete.initSubscription();
    this._useCaseDelete.execute(menuId);
    this._useCaseDelete.destroySubscription();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
    this.intervalSubscription.unsubscribe();
  }
}
