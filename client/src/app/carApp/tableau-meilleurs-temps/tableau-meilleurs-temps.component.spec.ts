import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TableauMeilleursTempsComponent } from "./tableau-meilleurs-temps.component";

describe("TableauMeilleursTempsComponent", () => {
  let component: TableauMeilleursTempsComponent;
  let fixture: ComponentFixture<TableauMeilleursTempsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauMeilleursTempsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauMeilleursTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
