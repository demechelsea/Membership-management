import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesAndDocstoreComponent } from './policiesAndDocstore.component';

describe('PoliciesAndDocstoreComponent', () => {
  let component: PoliciesAndDocstoreComponent;
  let fixture: ComponentFixture<PoliciesAndDocstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesAndDocstoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesAndDocstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
