import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DigitalIdCardComponent } from "./digitalIdCard.component";

describe("PoliciesAndDocstoreComponent", () => {
  let component: DigitalIdCardComponent;
  let fixture: ComponentFixture<DigitalIdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalIdCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalIdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
