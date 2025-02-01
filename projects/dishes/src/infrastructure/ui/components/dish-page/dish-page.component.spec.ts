import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishPageComponent } from './dish-page.component';
import { DishCardComponent } from '../dish-card/dish-card.component';
import {
  PageTitleComponent,
  AddComponent,
  BgImgageComponent,
  NoDataLabelComponent,
} from 'shared';
import { By } from '@angular/platform-browser';
import { IDish } from '../../../../domain/model/dish';

describe('DishPageComponent', () => {
  let component: DishPageComponent;
  let fixture: ComponentFixture<DishPageComponent>;

  const mockDishes: IDish[] = [
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
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DishPageComponent,
        DishCardComponent,
        PageTitleComponent,
        AddComponent,
        BgImgageComponent,
        NoDataLabelComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishPageComponent);
    component = fixture.componentInstance;
    component.dishes = mockDishes;
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
    expect(titleElement.getAttribute('title')).toBe('Dishes');
  });

  it('should display the add button', () => {
    const addButtonElement = fixture.debugElement.query(
      By.css('lib-add')
    ).nativeElement;
    expect(addButtonElement).toBeTruthy();
    expect(addButtonElement.getAttribute('link')).toBe('/dishes/add');
  });

  it('should display the background image if dishes are present', () => {
    const bgImageElement = fixture.debugElement.query(
      By.css('lib-bg-imgage')
    ).nativeElement;
    expect(bgImageElement).toBeTruthy();
    expect(bgImageElement.getAttribute('src')).toBe('dish.png');
    expect(bgImageElement.getAttribute('alt')).toBe('Dishes');
    expect(bgImageElement.getAttribute('title')).toBe('Dishes');
  });

  it('should display dish cards if dishes are present', () => {
    const dishCards = fixture.debugElement.queryAll(By.css('lib-dish-card'));
    expect(dishCards.length).toBe(2);
  });

  it('should display no data label if no dishes are present', () => {
    component.dishes = [];
    fixture.detectChanges();
    const noDataLabelElement = fixture.debugElement.query(
      By.css('lib-no-data-label')
    ).nativeElement;
    expect(noDataLabelElement).toBeTruthy();
  });
});
