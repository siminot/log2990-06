import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VueTeteHauteComponent } from "./vue-tete-haute.component";

describe("VueTeteHauteComponent", () => {
  let component: VueTeteHauteComponent;
  let fixture: ComponentFixture<VueTeteHauteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueTeteHauteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueTeteHauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
