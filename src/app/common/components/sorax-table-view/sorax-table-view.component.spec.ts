import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoraxTableViewComponent } from './sorax-table-view.component';

describe('TableRowComponent', () => {
  let component: SoraxTableViewComponent;
  let fixture: ComponentFixture<SoraxTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoraxTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoraxTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
