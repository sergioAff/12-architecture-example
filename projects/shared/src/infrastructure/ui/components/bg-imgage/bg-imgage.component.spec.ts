import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgImgageComponent } from './bg-imgage.component';

describe('BgImgageComponent', () => {
  let component: BgImgageComponent;
  let fixture: ComponentFixture<BgImgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgImgageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgImgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
