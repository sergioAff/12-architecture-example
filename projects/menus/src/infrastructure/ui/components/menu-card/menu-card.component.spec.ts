import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCardComponent } from './menu-card.component';
import { BtnsActionsComponent, ConfirmModalComponent } from 'shared';
import { CurrencyPipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';
import { IMenuResonse } from '../../../../domain/model/menuResponse';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('MenuCardComponent', () => {
  let component: MenuCardComponent;
  let fixture: ComponentFixture<MenuCardComponent>;
  let deleteMenuUseCase: jasmine.SpyObj<DeleteMenuUseCase>;
  let router: Router;

  const mockMenu: IMenuResonse = {
    id: 1,
    name: 'Italian Menu',
    dishes: [
      {
        id: 1,
        name: 'Pasta',
        price: 12.99,
        description: 'Delicious pasta with tomato sauce',
        isPopular: true,
      },
      {
        id: 2,
        name: 'Pizza',
        price: 15.99,
        description: 'Cheesy pizza with pepperoni',
        isPopular: false,
      },
    ],
  };

  beforeEach(async () => {
    const deleteMenuUseCaseSpy = jasmine.createSpyObj('DeleteMenuUseCase', [
      'initSubscription',
      'execute',
      'destroySubscription',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MenuCardComponent,
        BtnsActionsComponent,
        ConfirmModalComponent,
      ],
      providers: [
        { provide: DeleteMenuUseCase, useValue: deleteMenuUseCaseSpy },
        CurrencyPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCardComponent);
    component = fixture.componentInstance;
    deleteMenuUseCase = TestBed.inject(
      DeleteMenuUseCase
    ) as jasmine.SpyObj<DeleteMenuUseCase>;
    router = TestBed.inject(Router);
    component.menu = mockMenu;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu details', () => {
    const nameElement = fixture.debugElement.query(
      By.css('.card__name')
    ).nativeElement;
    expect(nameElement.textContent).toContain('Italian Menu');

    const idElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(idElement.textContent).toContain('ID: 1');

    const dishElements = fixture.debugElement.queryAll(
      By.css('.card__list-item')
    );
    expect(dishElements.length).toBe(2);

    expect(dishElements[0].nativeElement.textContent).toContain(
      'Pasta - $12.99'
    );
    expect(dishElements[1].nativeElement.textContent).toContain(
      'Pizza - $15.99'
    );
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

  // it('should call deleteMenuUseCase.execute when confirmDelete is called', () => {
  //   deleteMenuUseCase.execute.and.returnValue(of(void 0));
  //   component.confirmDelete();
  //   expect(deleteMenuUseCase.initSubscription).toHaveBeenCalled();
  //   expect(deleteMenuUseCase.execute).toHaveBeenCalledWith(mockMenu.id);
  //   expect(deleteMenuUseCase.destroySubscription).toHaveBeenCalled();
  // });

  it('should navigate to edit menu when editMenu is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.editMenu();
    expect(navigateSpy).toHaveBeenCalledWith(['/menus/edit', mockMenu.id]);
  });
});
