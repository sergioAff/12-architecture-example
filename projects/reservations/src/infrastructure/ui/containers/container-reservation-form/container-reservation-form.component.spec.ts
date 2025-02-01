import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerReservationFormComponent } from './container-reservation-form.component';

describe('ContainerReservationFormComponent', () => {
  let component: ContainerReservationFormComponent;
  let fixture: ComponentFixture<ContainerReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerReservationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
