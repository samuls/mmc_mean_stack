import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDrivenFormComponent } from './data-driven-form.component';

describe('DataDrivenFormComponent', () => {
  let component: DataDrivenFormComponent;
  let fixture: ComponentFixture<DataDrivenFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataDrivenFormComponent]
    });
    fixture = TestBed.createComponent(DataDrivenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
