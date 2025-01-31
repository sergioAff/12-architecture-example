import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteOrderUseCase } from '../../../../application/delete-order.usecase';
import { IOrderResponse } from '../../../../domain/model/orderResponse';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-order-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent, CurrencyPipe],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent implements OnDestroy {
  @Input() order!: IOrderResponse;
  isModalOpen = false;

  private readonly _useCase = inject(DeleteOrderUseCase);
  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this._useCase.initSubscription();
    this._useCase.execute(this.order.id);
    this.closeModal();
  }

  editOrder(): void {
    this.router.navigate(['/orders/edit', this.order.id]);
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }
}
