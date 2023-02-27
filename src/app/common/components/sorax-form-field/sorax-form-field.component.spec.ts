import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoraxFormFieldComponent } from './sorax-form-field.component';

describe('SoraxFormFieldComponent', () => {
  let component: SoraxFormFieldComponent;
  let fixture: ComponentFixture<SoraxFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoraxFormFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoraxFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
