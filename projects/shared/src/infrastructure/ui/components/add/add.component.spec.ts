import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComponent, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct link', () => {
    component.link = '/test-link';
    fixture.detectChanges();
    const anchorElement = fixture.debugElement.query(
      By.css('.main__add')
    ).nativeElement;
    expect(anchorElement.getAttribute('href')).toBe('/test-link');
  });

  it('should render the button with correct text', () => {
    const anchorElement = fixture.debugElement.query(
      By.css('.main__add')
    ).nativeElement;
    expect(anchorElement.textContent).toBe('+');
  });

  it('should have the correct aria-label', () => {
    const anchorElement = fixture.debugElement.query(
      By.css('.main__add')
    ).nativeElement;
    expect(anchorElement.getAttribute('aria-label')).toBe('Add');
  });

  it('should have the correct role', () => {
    const anchorElement = fixture.debugElement.query(
      By.css('.main__add')
    ).nativeElement;
    expect(anchorElement.getAttribute('role')).toBe('button');
  });
});
