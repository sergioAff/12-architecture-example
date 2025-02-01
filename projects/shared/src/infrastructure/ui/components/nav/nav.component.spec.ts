import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './nav.component';
import { LogoComponent } from '../logo/logo.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavComponent,
        LogoComponent,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'someValue',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo component', () => {
    const logoElement = fixture.debugElement.query(By.css('lib-logo'));
    expect(logoElement).toBeTruthy();
  });

  it('should render the navigation menu with routes', () => {
    const menuItems = fixture.debugElement.queryAll(
      By.css('.header__nav-menu-item')
    );
    expect(menuItems.length).toBe(component.navRoutes.length);
  });

  it('should apply selected class to active route', () => {
    const testRoute = component.navRoutes[0];
    spyOn(component, 'isRouteActive').and.returnValue(true);
    fixture.detectChanges();

    const selectedMenuItem = fixture.debugElement.query(
      By.css('.header__nav-menu-item---selected')
    );
    expect(selectedMenuItem).toBeTruthy();
    expect(selectedMenuItem.nativeElement.textContent.trim()).toContain(
      testRoute.name
    );
  });

  it('should have correct attributes for menu links', () => {
    const menuLinks = fixture.debugElement.queryAll(
      By.css('.header__nav-menu-link')
    );
    const firstRoute = component.navRoutes[0];

    expect(menuLinks.length).toBe(component.navRoutes.length);
    expect(menuLinks[0].nativeElement.getAttribute('title')).toBe(
      firstRoute.name
    );
    expect(
      menuLinks[0].nativeElement.getAttribute('ng-reflect-router-link')
    ).toBe(firstRoute.path);
  });
});
