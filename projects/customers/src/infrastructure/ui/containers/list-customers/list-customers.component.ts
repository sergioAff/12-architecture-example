import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CustomerPageComponent } from '../../components/customer-page/customer-page.component';
import { GetAllCustomerUseCase } from '../../../../application/get-all-customers.usecase';
import { Observable, Subscription, interval } from 'rxjs';
import { ICustomer } from '../../../../domain/model/customer';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { DeleteCustomerUseCase } from '../../../../application/delete-customer.usecase';

@Component({
  selector: 'lib-list-customers',
  imports: [CustomerPageComponent, AsyncPipe],
  templateUrl: './list-customers.component.html',
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllCustomerUseCase);
  private readonly _useCaseDelete = inject(DeleteCustomerUseCase);
  public customers$: Observable<ICustomer[]>;
  private intervalSubscription: Subscription;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.customers$ = this._useCase.customers$();

    this.intervalSubscription = interval(100)
      .pipe(switchMap(async () => this._useCase.execute()))
      .subscribe();
  }

  onRequestDelete(customerId: number): void {
    this._useCaseDelete.initSubscription();
    this._useCaseDelete.execute(customerId);
    this._useCaseDelete.destroySubscription();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
