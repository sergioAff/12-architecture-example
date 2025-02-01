import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishCardComponent } from './dish-card.component';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';
import { CurrencyPipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteDishUseCase } from '../../../../application/delete-dish.usecase';
import { IDish } from '../../../../domain/model/dish';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('DishCardComponent', () => {
  let component: DishCardComponent;
  let fixture: ComponentFixture<DishCardComponent>;
  let deleteDishUseCase: jasmine.SpyObj<DeleteDishUseCase>;
  let router: Router;

  const mockDish: IDish = {
    id: 1,
    name: 'Pasta',
    price: 12.99,
    description: 'Delicious pasta with tomato sauce',
    isPopular: true,
  };

  beforeEach(async () => {
    const deleteDishUseCaseSpy = jasmine.createSpyObj('DeleteDishUseCase', [
      'initSubscription',
      'execute',
      'destroySubscription',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        DishCardComponent,
        BtnsActionsComponent,
        ConfirmModalComponent,
      ],
      providers: [
        { provide: DeleteDishUseCase, useValue: deleteDishUseCaseSpy },
        CurrencyPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishCardComponent);
    component = fixture.componentInstance;
    deleteDishUseCase = TestBed.inject(
      DeleteDishUseCase
    ) as jasmine.SpyObj<DeleteDishUseCase>;
    router = TestBed.inject(Router);
    component.dish = mockDish;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dish details', () => {
    const nameElement = fixture.debugElement.query(
      By.css('.card__name')
    ).nativeElement;
    expect(nameElement.textContent).toContain('Pasta');

    const idElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(idElement.textContent).toContain('ID: 1');

    const priceElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(priceElement.textContent).toContain('$12.99');

    const descriptionElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(descriptionElement.textContent).toContain(
      'Delicious pasta with tomato sauce'
    );

    const popularElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(popularElement.textContent).toContain('Is Popular: true');
  });

  it('should open the modal when openModal is called', () => {
    component.openModal();
    fixture.detectChanges();
    expect(component.isModalOpen).toBeTrue();
  });

  it('should close the modal when closeModal is called', () => {
    component.isModalOpen = true;
    component.closeModal();
    fixture.detectChanges();
    expect(component.isModalOpen).toBeFalse();
  });

  //   it('should call deleteDishUseCase.execute when confirmDelete is called', () => {
  //     deleteDishUseCase.execute.and.returnValue(of(void 0));
  //     component.confirmDelete();
  //     expect(deleteDishUseCase.initSubscription).toHaveBeenCalled();
  //     expect(deleteDishUseCase.execute).toHaveBeenCalledWith(mockDish.id);
  //     expect(deleteDishUseCase.destroySubscription).toHaveBeenCalled();
  //   });

  it('should navigate to edit dish when editDish is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.editDish();
    expect(navigateSpy).toHaveBeenCalledWith(['/dishes/edit', mockDish.id]);
  });
});
