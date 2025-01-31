import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../../../../domain/model/customer';
import { CreateCustomerUseCase } from '../../../../application/create-customer.usecase';
import { EditCustomerUseCase } from '../../../../application/edit-customer.usecase';
import { GetCustomerUseCase } from '../../../../application/get-customer.usecase';
import { CustomFormComponent } from 'shared';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CustomerFormComponent } from '../../forms/customer-form.component';

@Component({
  selector: 'lib-container-form',
  imports: [AsyncPipe, CustomerFormComponent],
  templateUrl: './container-form.component.html',
})
export class ContainerFormComponent implements OnInit {
  private readonly _addCustomerUseCase = inject(CreateCustomerUseCase);
  private readonly _editCustomerUseCase = inject(EditCustomerUseCase);
  private readonly _getCustomerUseCase = inject(GetCustomerUseCase);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public _customerId: number | null = null;
  public _formData: Observable<ICustomer | null> = of(null);

  ngOnInit(): void {
    this._addCustomerUseCase.initSubscription();
    this._editCustomerUseCase.initSubscription();
    this._getCustomerUseCase.initSubscription();

    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._customerId = +id;
        this.loadCustomerData(this._customerId);
      }
    });
  }

  loadCustomerData(id: number): void {
    this._getCustomerUseCase.execute(id);
    this._formData = this._getCustomerUseCase.customers$(id);
    this.updateFormData();
  }

  updateFormData(): void {
    if (this._formData) {
      const formComponent = this.getFormComponent();
      if (formComponent) {
        formComponent.formGroup.patchValue(this._formData);
      }
    }
  }

  getFormComponent(): CustomFormComponent | null {
    const formComponent = document.querySelector(
      'lib-custom-form'
    ) as unknown as CustomFormComponent;
    return formComponent ? formComponent : null;
  }

  submitAction(data: ICustomer): void {
    if (this._customerId) {
      this._editCustomerUseCase.execute(this._customerId, data);
    } else {
      this._addCustomerUseCase.execute(data);
    }
    this._router.navigate(['/customers']);
  }
}
