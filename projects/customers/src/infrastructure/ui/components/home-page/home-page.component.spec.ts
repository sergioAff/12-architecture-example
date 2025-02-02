import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HomePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main container with its content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const mainContainer = compiled.querySelector('.main__container');
    expect(mainContainer).toBeTruthy();

    const logo = compiled.querySelector('.main__logo') as HTMLImageElement;
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('logo.png');

    const title = compiled.querySelector('.main__title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Welcome to our Restaurant');

    const description = compiled.querySelector('.main__description');
    expect(description).toBeTruthy();
    expect(description?.textContent).toContain(
      'Efficient and user-friendly restaurant management system'
    );
  });

  it('should have a "Get Started" link with routerLink pointing to "/customers"', () => {
    const linkDe = fixture.debugElement.query(By.css('.main__start'));
    expect(linkDe).toBeTruthy();

    const routerLinkAttr = linkDe.attributes['ng-reflect-router-link'];

    expect(routerLinkAttr).toBe('/customers');
  });
});
