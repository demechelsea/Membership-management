import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './site-list.component';

describe('SiteListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent]
    });
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
