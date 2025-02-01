import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BgImgageComponent } from './bg-imgage.component';
import { By } from '@angular/platform-browser';

describe('BgImgageComponent', () => {
  let component: BgImgageComponent;
  let fixture: ComponentFixture<BgImgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgImgageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BgImgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct input properties', () => {
    component.src = 'test-src.jpg';
    component.alt = 'test-alt';
    component.title = 'test-title';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(
      By.css('.main__image')
    ).nativeElement;
    expect(imgElement.src).toContain('test-src.jpg');
    expect(imgElement.alt).toBe('test-alt');
    expect(imgElement.title).toBe('test-title');
  });
});
