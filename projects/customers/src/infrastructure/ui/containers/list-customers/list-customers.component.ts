import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CustomerPageComponent } from '../../components/customer-page/customer-page.component';
import { GetAllCustomerUseCase } from '../../../../application/get-all-customers.usecase';
import { Observable, Subscription, interval } from 'rxjs';
import { ICustomer } from '../../../../domain/model/customer';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'lib-list-customers',
  imports: [CustomerPageComponent, AsyncPipe],
  templateUrl: './list-customers.component.html',
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(GetAllCustomerUseCase);
  public customers$: Observable<ICustomer[]>;
  private intervalSubscription: Subscription;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.customers$ = this._useCase.customers$();

    this.intervalSubscription = interval(500)
      .pipe(switchMap(async () => this._useCase.execute()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
