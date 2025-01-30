import { Component, inject, Input, OnDestroy } from '@angular/core';
import { ICustomer } from '../../../../domain/model/customer';
import { DeleteCustomerUseCase } from '../../../../application/delete-customer.usecase';
import { Router } from '@angular/router';
import { BtnsActionsComponent } from 'shared';
import { ConfirmModalComponent } from 'shared';

@Component({
  selector: 'lib-customer-card',
  imports: [BtnsActionsComponent, ConfirmModalComponent],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
})
export class CustomerCardComponent implements OnDestroy {
  @Input() customer!: ICustomer;
  isModalOpen = false;

  private readonly _useCase = inject(DeleteCustomerUseCase);
  private readonly router = inject(Router);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this._useCase.initSubscription();
    this._useCase.execute(this.customer.id);
    this.closeModal();
  }

  editCustomer(): void {
    this.router.navigate(['/customers/edit', this.customer.id]);
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
