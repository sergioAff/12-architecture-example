import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoDataLabelComponent } from './no-data-label.component';

describe('NoDataLabelComponent', () => {
  let component: NoDataLabelComponent;
  let fixture: ComponentFixture<NoDataLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text', () => {
    const noDataElement = fixture.debugElement.query(
      By.css('.main__no-data')
    ).nativeElement;
    expect(noDataElement.textContent.trim()).toBe('No data available');
  });

  it('should have the correct attributes', () => {
    const noDataElement = fixture.debugElement.query(
      By.css('.main__no-data')
    ).nativeElement;
    expect(noDataElement.getAttribute('aria-label')).toBe('No data available');
    expect(noDataElement.getAttribute('role')).toBe('alert');
  });
});
