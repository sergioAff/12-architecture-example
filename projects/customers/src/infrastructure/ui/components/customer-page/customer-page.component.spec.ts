import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerPageComponent } from './customer-page.component';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { ICustomer } from '../../../../domain/model/customer';

// Componentes stub
@Component({
  selector: 'lib-page-title',
  template: '',
  standalone: true,
})
class StubPageTitleComponent {
  @Input() title!: string;
}

@Component({
  selector: 'lib-add',
  template: '',
  standalone: true,
})
class StubAddComponent {
  @Input() link!: string;
}

@Component({
  selector: 'lib-bg-imgage',
  template: '',
  standalone: true,
})
class StubBgImgageComponent {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() title!: string;
}

@Component({
  selector: 'lib-no-data-label',
  template: '',
  standalone: true,
})
class StubNoDataLabelComponent {}

@Component({
  selector: 'lib-customer-card',
  template: '',
  standalone: true,
})
class StubCustomerCardComponent {
  @Input() customer!: ICustomer;
}

describe('CustomerPageComponent', () => {
  let component: CustomerPageComponent;
  let fixture: ComponentFixture<CustomerPageComponent>;

  const mockCustomers: ICustomer[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      phone: '123456789',
      isFrequent: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerPageComponent,
        StubPageTitleComponent,
        StubAddComponent,
        StubBgImgageComponent,
        StubNoDataLabelComponent,
        StubCustomerCardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerPageComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct header information', () => {
    fixture.detectChanges();

    const pageTitle = fixture.debugElement.query(
      By.directive(StubPageTitleComponent)
    ).componentInstance as StubPageTitleComponent;

    const addComponent = fixture.debugElement.query(
      By.directive(StubAddComponent)
    ).componentInstance as StubAddComponent;

    expect(pageTitle.title).toBe('Customers');
    expect(addComponent.link).toBe('/customers/add');
  });

  it('should display background image and cards when customers exist', () => {
    component.customers = mockCustomers;
    fixture.detectChanges();

    const bgImage = fixture.debugElement.query(
      By.directive(StubBgImgageComponent)
    ).componentInstance as StubBgImgageComponent;

    const customerCards = fixture.debugElement.queryAll(
      By.directive(StubCustomerCardComponent)
    );

    expect(bgImage.src).toBe('customer.png');
    expect(bgImage.alt).toBe('Customers');
    expect(bgImage.title).toBe('Customers');
    expect(customerCards.length).toBe(1);
    expect(customerCards[0].componentInstance.customer).toEqual(
      mockCustomers[0]
    );
  });

  it('should display no data message when no customers', () => {
    component.customers = [];
    fixture.detectChanges();

    const bgImage = fixture.debugElement.query(
      By.directive(StubBgImgageComponent)
    );
    const noDataLabel = fixture.debugElement.query(
      By.directive(StubNoDataLabelComponent)
    );
    const container = fixture.debugElement.query(By.css('.main__container'));

    expect(bgImage).toBeNull();
    expect(noDataLabel).toBeTruthy();
    expect(container).toBeNull();
  });

  it('should pass correct image properties to background component', () => {
    component.customers = mockCustomers;
    fixture.detectChanges();

    const bgImage = fixture.debugElement.query(
      By.directive(StubBgImgageComponent)
    ).componentInstance as StubBgImgageComponent;

    expect(bgImage.src).toBe(component.srcImage);
    expect(bgImage.alt).toBe(component.altImage);
    expect(bgImage.title).toBe(component.titleImage);
  });
});
