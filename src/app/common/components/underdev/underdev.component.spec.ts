import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderdevComponent } from './underdev.component';

describe('UnderdevComponent', () => {
  let component: UnderdevComponent;
  let fixture: ComponentFixture<UnderdevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderdevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderdevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
