import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { CustomerPageComponent } from '../../components/customer-page/customer-page.component';
import { GetAllCustomerUseCase } from '../../../../application/get-all-customers.usecase';
import { Observable } from 'rxjs';
import { ICustomer } from '../../../../domain/model/customer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-list-customers',
  imports: [CustomerPageComponent, AsyncPipe],
  templateUrl: './list-customers.component.html',
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllCustomerUseCase);
  public customers$: Observable<ICustomer[]>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAllCustomers();
    this.customers$ = this._useCase.customers$();
  }

  getAllCustomers(): void {
    this._useCase.execute();
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
