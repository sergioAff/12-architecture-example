import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMenusFormComponent } from './container-menus-form.component';

describe('ContainerMenusFormComponent', () => {
  let component: ContainerMenusFormComponent;
  let fixture: ComponentFixture<ContainerMenusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerMenusFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerMenusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
