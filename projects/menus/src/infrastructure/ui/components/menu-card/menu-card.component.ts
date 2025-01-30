import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';
import { IMenuResonse } from '../../../../domain/model/menuResponse';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-menu-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent, CurrencyPipe],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent implements OnDestroy {
  @Input() menu!: IMenuResonse;
  isModalOpen = false;

  private readonly _useCase = inject(DeleteMenuUseCase);
  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this._useCase.initSubscription();
    this._useCase.execute(this.menu.id);
    this.closeModal();
  }

  editMenu(): void {
    this.router.navigate(['/menus/edit', this.menu.id]);
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
