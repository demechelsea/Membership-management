import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EventProgramListComponent } from "./event-ticket-list.component";

describe("EventTicketListComponent", () => {
  let component: EventProgramListComponent;
  let fixture: ComponentFixture<EventProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventProgramListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
