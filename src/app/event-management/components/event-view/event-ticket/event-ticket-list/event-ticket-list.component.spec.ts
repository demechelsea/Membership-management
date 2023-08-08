import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EventTicketListComponent } from "./event-ticket-list.component";

describe("EventTicketListComponent", () => {
  let component: EventTicketListComponent;
  let fixture: ComponentFixture<EventTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTicketListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
