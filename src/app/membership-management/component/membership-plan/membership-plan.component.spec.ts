import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MembershipManagementComponent } from "./membership-plan.component";

describe("MembershipManagementComponent", () => {
  let component: MembershipManagementComponent;
  let fixture: ComponentFixture<MembershipManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
