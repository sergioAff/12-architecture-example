import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPageComponent } from './menu-page.component';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import {
  PageTitleComponent,
  AddComponent,
  BgImgageComponent,
  NoDataLabelComponent,
} from 'shared';
import { By } from '@angular/platform-browser';
import { IMenuResonse } from '../../../../domain/model/menuResponse';

describe('MenuPageComponent', () => {
  let component: MenuPageComponent;
  let fixture: ComponentFixture<MenuPageComponent>;

  const mockMenus: IMenuResonse[] = [
    {
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
    },
    {
      id: 2,
      name: 'Mexican Menu',
      dishes: [
        {
          id: 3,
          name: 'Tacos',
          price: 9.99,
          description: 'Spicy beef tacos',
          isPopular: true,
        },
        {
          id: 4,
          name: 'Burrito',
          price: 11.99,
          description: 'Chicken burrito with beans',
          isPopular: false,
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuPageComponent,
        MenuCardComponent,
        PageTitleComponent,
        AddComponent,
        BgImgageComponent,
        NoDataLabelComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
    component.menus = mockMenus;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('lib-page-title')
    ).nativeElement;
    expect(titleElement).toBeTruthy();
    expect(titleElement.getAttribute('title')).toBe('Menus');
  });

  it('should display the add button', () => {
    const addButtonElement = fixture.debugElement.query(
      By.css('lib-add')
    ).nativeElement;
    expect(addButtonElement).toBeTruthy();
    expect(addButtonElement.getAttribute('link')).toBe('/menus/add');
  });

  it('should display the background image if menus are present', () => {
    const bgImageElement = fixture.debugElement.query(
      By.css('lib-bg-imgage')
    ).nativeElement;
    expect(bgImageElement).toBeTruthy();
    expect(bgImageElement.getAttribute('src')).toBe('hamburguesa.png');
    expect(bgImageElement.getAttribute('alt')).toBe('hamburguer');
    expect(bgImageElement.getAttribute('title')).toBe('Menus');
  });

  it('should display menu cards if menus are present', () => {
    const menuCards = fixture.debugElement.queryAll(By.css('lib-menu-card'));
    expect(menuCards.length).toBe(2);
  });

  it('should display no data label if no menus are present', () => {
    component.menus = [];
    fixture.detectChanges();
    const noDataLabelElement = fixture.debugElement.query(
      By.css('lib-no-data-label')
    ).nativeElement;
    expect(noDataLabelElement).toBeTruthy();
  });
});
