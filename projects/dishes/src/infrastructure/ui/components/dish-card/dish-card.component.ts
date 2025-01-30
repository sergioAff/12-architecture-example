import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteDishUseCase } from '../../../../application/delete-dish.usecase';
import { IDish } from 'projects/dishes/src/domain/model/dish';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-dish-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent, CurrencyPipe],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.scss',
})
export class DishCardComponent implements OnDestroy {
  @Input() dish!: IDish;
  isModalOpen = false;

  private readonly _useCase = inject(DeleteDishUseCase);
  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this._useCase.initSubscription();
    this._useCase.execute(this.dish.id);
    this.closeModal();
  }

  editDish(): void {
    this.router.navigate(['/dishes/edit', this.dish.id]);
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
