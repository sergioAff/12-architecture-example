import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IDish } from '../../../../domain/model/dish';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-dish-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent, CurrencyPipe],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.scss',
})
export class DishCardComponent {
  @Input() dish!: IDish;
  isModalOpen = false;
  @Output() deleteDish: EventEmitter<number> = new EventEmitter<number>();

  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteDish.emit();
  }

  editDish(): void {
    this.router.navigate(['/dishes/edit', this.dish.id]);
  }
}
