import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoraxAutocompleteComponent } from './sorax-autocomplete.component';

describe('SoraxAutocompleteComponent', () => {
  let component: SoraxAutocompleteComponent;
  let fixture: ComponentFixture<SoraxAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoraxAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoraxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
