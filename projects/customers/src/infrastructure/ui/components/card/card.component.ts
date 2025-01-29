import { Component, inject, Input } from '@angular/core';
import { ICustomer } from '../../../../domain/model/customer';
import { DeleteCustomerUseCase } from '../../../../application/delete-customer.usecase';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
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
    this._useCase.destroySubscription();
  }

  editCustomer(): void {
    this.router.navigate(['/customer/edit', this.customer.id]);
  }
}
