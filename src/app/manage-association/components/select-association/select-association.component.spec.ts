import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssociationComponent } from './select-association.component';

describe('SelectAssociationComponent', () => {
  let component: SelectAssociationComponent;
  let fixture: ComponentFixture<SelectAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAssociationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
