import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempConponentComponent } from './temp-conponent.component';

describe('TempConponentComponent', () => {
  let component: TempConponentComponent;
  let fixture: ComponentFixture<TempConponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempConponentComponent]
    });
    fixture = TestBed.createComponent(TempConponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
