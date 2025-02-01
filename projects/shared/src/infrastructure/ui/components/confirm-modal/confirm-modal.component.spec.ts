import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css('.modal__title')
    ).nativeElement;
    expect(titleElement.textContent).toBe('Test Title');
  });

  it('should display the correct message', () => {
    component.message = 'Test Message';
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(
      By.css('.modal__message')
    ).nativeElement;
    expect(messageElement.textContent).toBe('Test Message');
  });

  it('should emit confirm event when Yes button is clicked', () => {
    spyOn(component.confirm, 'emit');

    const confirmButton = fixture.debugElement.query(
      By.css('.modal__btn---yes')
    ).nativeElement;
    confirmButton.click();

    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should emit cancel event when No button is clicked', () => {
    spyOn(component.cancel, 'emit');

    const cancelButton = fixture.debugElement.query(
      By.css('.modal__btn---no')
    ).nativeElement;
    cancelButton.click();

    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
