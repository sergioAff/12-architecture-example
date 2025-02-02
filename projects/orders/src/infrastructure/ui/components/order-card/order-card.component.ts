import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IOrderResponse } from '../../../../domain/model/orderResponse';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-order-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent, CurrencyPipe],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() order!: IOrderResponse;
  isModalOpen = false;
  @Output() deleteOrder: EventEmitter<number> = new EventEmitter<number>();
  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteOrder.emit();
  }

  editOrder(): void {
    this.router.navigate(['/orders/edit', this.order.id]);
  }
}
