import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DefinitionHComponent } from "./definitionH.component";

describe("DefinitioHComponent", () => {
  let component: DefinitionHComponent;
  let fixture: ComponentFixture<DefinitionHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
