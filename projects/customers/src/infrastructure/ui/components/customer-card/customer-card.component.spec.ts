import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCardComponent } from './customer-card.component';
import { ICustomer } from '../../../../domain/model/customer';

describe('CustomerCardComponent', () => {
  let component: CustomerCardComponent;
  let fixture: ComponentFixture<CustomerCardComponent>;
  const mockCustomer: ICustomer = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    isFrequent: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCardComponent);
    component = fixture.componentInstance;
    component.customer = mockCustomer;
    fixture.detectChanges();
  });

  it('should render customer data correctly', () => {
    const card = fixture.nativeElement.querySelector('.card');
    expect(card.textContent).toContain('John Doe');
    expect(card.textContent).toContain('ID: 1');
    expect(card.textContent).toContain('Email: john@example.com');
    expect(card.textContent).toContain('Phone: 123-456-7890');
    expect(card.textContent).toContain('Frequent Customer: Yes');
  });

  it('should handle edit action', () => {
    spyOn(component, 'editCustomer');
    component.editCustomer();
    expect(component.editCustomer).toHaveBeenCalled();
  });

  it('should open and close modal', () => {
    component.openModal();
    expect(component.isModalOpen).toBeTrue();

    component.closeModal();
    expect(component.isModalOpen).toBeFalse();
  });

  it('should confirm delete', () => {
    spyOn(component, 'confirmDelete');
    component.confirmDelete();
    expect(component.confirmDelete).toHaveBeenCalled();
  });
});
