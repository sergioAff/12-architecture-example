import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ICustomer } from '../../../../domain/model/customer';
import { Router } from '@angular/router';
import { BtnsActionsComponent } from 'shared';
import { ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-customer-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
})
export class CustomerCardComponent {
  @Input() customer!: ICustomer;
  isModalOpen = false;
  @Output() deleteCustomer: EventEmitter<number> = new EventEmitter<number>();

  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteCustomer.emit();
  }

  editCustomer(): void {
    this.router.navigate(['/customers/edit', this.customer.id]);
  }
}
