import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfigPartieComponent } from "./config-partie.component";

describe("ConfigPartieComponent", () => {
  let component: ConfigPartieComponent;
  let fixture: ComponentFixture<ConfigPartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPartieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("test ajoutDansRequete", () => {

    it("devrait pas planter lol", () => {
      // Pour l'instant
      expect(component).toBeTruthy();
    });

  });

});
