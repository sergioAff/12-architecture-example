import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form/customer-form.component';
import { CreateCustomerUseCase } from '../../../../application/customers/create-customer.usecase';
import { Observable } from 'rxjs';
import { ICustomer } from '../../../../domain/model/customer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-create-customer',
  imports: [CustomerFormComponent, AsyncPipe],
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateCustomerUseCase);
  public customer$: Observable<ICustomer>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.customer$ = this._useCase.customer$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }

  createCustomer(customer: ICustomer): void {
    this._useCase.execute(customer);
  }
}
