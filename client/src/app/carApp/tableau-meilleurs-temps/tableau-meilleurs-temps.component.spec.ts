import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TableauMeilleursTempsComponent } from "./tableau-meilleurs-temps.component";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { HttpClient, HttpHandler } from "@angular/common/http";

describe("TableauMeilleursTempsComponent", () => {
  let component: TableauMeilleursTempsComponent;
  let fixture: ComponentFixture<TableauMeilleursTempsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauMeilleursTempsComponent ],
      providers: [ GestionnaireBDCourse, HttpClient, HttpHandler]
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
