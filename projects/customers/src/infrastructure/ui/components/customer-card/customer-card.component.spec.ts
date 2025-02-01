import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCardComponent } from './customer-card.component';
import { ICustomer } from '../../../../domain/model/customer';
import { DeleteCustomerUseCase } from '../../../../application/delete-customer.usecase';
import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';

// Stubs standalone con el mismo selector
@Component({
  standalone: true,
  selector: 'lib-btns-actions',
  template: '',
})
class StubBtnsActionsComponent {
  @Output() editAction = new EventEmitter<void>();
  @Output() deleteAction = new EventEmitter<void>();
}

@Component({
  standalone: true,
  selector: 'lib-confirm-modal',
  template: '',
})
class StubConfirmModalComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}

describe('CustomerCardComponent', () => {
  let component: CustomerCardComponent;
  let fixture: ComponentFixture<CustomerCardComponent>;
  let deleteUseCase: jasmine.SpyObj<DeleteCustomerUseCase>;
  let router: jasmine.SpyObj<Router>;

  const mockCustomer: ICustomer = {
    id: 1, // ✔️ ID como string
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    isFrequent: true,
  };

  beforeEach(() => {
    deleteUseCase = jasmine.createSpyObj('DeleteCustomerUseCase', [
      'initSubscription',
      'execute',
      'destroySubscription',
    ]);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        CustomerCardComponent, // Componente standalone bajo prueba
        StubBtnsActionsComponent, // Stubs standalone
        StubConfirmModalComponent,
      ],
      providers: [
        { provide: DeleteCustomerUseCase, useValue: deleteUseCase },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignorar componentes no mockeados
    });

    fixture = TestBed.createComponent(CustomerCardComponent);
    component = fixture.componentInstance;
    component.customer = mockCustomer;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería eliminar el cliente al confirmar el modal', () => {
    component.isModalOpen = true;
    fixture.detectChanges();

    const modal = fixture.debugElement.query(
      By.directive(StubConfirmModalComponent)
    ).componentInstance as StubConfirmModalComponent;

    modal.confirm.emit();
    expect(deleteUseCase.execute).toHaveBeenCalledWith(1); // ✔️ ID como string
  });
});
