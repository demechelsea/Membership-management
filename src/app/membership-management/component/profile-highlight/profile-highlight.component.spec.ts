import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileHighlightComponent } from "./profile-highlight.component";

describe("ProfileHighlightComponent", () => {
  let component: ProfileHighlightComponent;
  let fixture: ComponentFixture<ProfileHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileHighlightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
