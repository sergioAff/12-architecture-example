import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BtnsActionsComponent } from './btns-actions.component';

describe('BtnsActionsComponent', () => {
  let component: BtnsActionsComponent;
  let fixture: ComponentFixture<BtnsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnsActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editAction event when Edit button is clicked', () => {
    spyOn(component.editAction, 'emit');

    const editButton = fixture.debugElement.query(
      By.css('.card__btns---edit')
    ).nativeElement;
    editButton.click();

    expect(component.editAction.emit).toHaveBeenCalled();
  });

  it('should emit deleteAction event when Delete button is clicked', () => {
    spyOn(component.deleteAction, 'emit');

    const deleteButton = fixture.debugElement.query(
      By.css('.card__btns---delete')
    ).nativeElement;
    deleteButton.click();

    expect(component.deleteAction.emit).toHaveBeenCalled();
  });
});
