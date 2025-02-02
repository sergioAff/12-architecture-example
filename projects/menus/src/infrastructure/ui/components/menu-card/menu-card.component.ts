import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuResonse } from '../../../../domain/model/menuResponse';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-menu-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent, CurrencyPipe],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent {
  @Input() menu!: IMenuResonse;
  @Output() deleteMenu: EventEmitter<number> = new EventEmitter<number>();
  isModalOpen = false;

  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteMenu.emit();
  }

  editMenu(): void {
    this.router.navigate(['/menus/edit', this.menu.id]);
  }
}
