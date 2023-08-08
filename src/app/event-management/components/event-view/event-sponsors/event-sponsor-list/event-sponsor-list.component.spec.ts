import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EventTicketIssueListComponent } from "./event-ticket-list.component";

describe("EventTicketListComponent", () => {
  let component: EventTicketIssueListComponent;
  let fixture: ComponentFixture<EventTicketIssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTicketIssueListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventTicketIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
