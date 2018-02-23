import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DefinitioHComponent } from "./definitio-h.component";

describe("DefinitioHComponent", () => {
  let component: DefinitioHComponent;
  let fixture: ComponentFixture<DefinitioHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitioHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitioHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
