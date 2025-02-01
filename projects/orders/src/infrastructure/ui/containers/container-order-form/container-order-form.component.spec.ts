import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerOrderFormComponent } from './container-order-form.component';

describe('ContainerOrderFormComponent', () => {
  let component: ContainerOrderFormComponent;
  let fixture: ComponentFixture<ContainerOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
