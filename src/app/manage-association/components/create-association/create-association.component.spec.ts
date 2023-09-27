import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssociationComponent } from './create-association.component';

describe('CreateAssociationComponent', () => {
  let component: CreateAssociationComponent;
  let fixture: ComponentFixture<CreateAssociationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAssociationComponent]
    });
    fixture = TestBed.createComponent(CreateAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
