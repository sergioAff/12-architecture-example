import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LogoComponent } from './logo.component';
import { ActivatedRoute } from '@angular/router';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'mockValue',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link with the correct attributes', () => {
    const linkElement = fixture.debugElement.query(
      By.css('.header__logo')
    ).nativeElement;
    expect(linkElement.getAttribute('title')).toBe('Home');
    expect(linkElement.getAttribute('aria-label')).toBe('Home');
  });

  it('should have an img with the correct attributes', () => {
    const imgElement = fixture.debugElement.query(
      By.css('.header__logo img')
    ).nativeElement;
    expect(imgElement.getAttribute('src')).toBe('logo.png');
    expect(imgElement.getAttribute('alt')).toBe('Logo of the site name');
    expect(imgElement.getAttribute('title')).toBe('Logo of the site name');
    expect(imgElement.getAttribute('aria-label')).toBe('Logo of the site name');
  });

  it('should apply correct styles to the logo', () => {
    const linkElement = fixture.debugElement.query(
      By.css('.header__logo')
    ).nativeElement;
    const imgElement = fixture.debugElement.query(
      By.css('.header__logo img')
    ).nativeElement;

    expect(window.getComputedStyle(linkElement).paddingTop).toBe('10px');
    expect(window.getComputedStyle(imgElement).width).toBe('70px');
  });
});
