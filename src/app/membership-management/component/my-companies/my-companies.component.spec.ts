import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MycompaniesComponent } from "./my-companies.component";

describe("MycompaniesComponent", () => {
  let component: MycompaniesComponent;
  let fixture: ComponentFixture<MycompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MycompaniesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MycompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
