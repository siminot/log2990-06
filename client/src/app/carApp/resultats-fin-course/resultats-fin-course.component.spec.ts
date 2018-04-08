import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultatsFinCourseComponent } from "./resultats-fin-course.component";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { HttpClient, HttpHandler } from "@angular/common/http";

describe("ResultatsFinCourseComponent", () => {
  let component: ResultatsFinCourseComponent;
  let fixture: ComponentFixture<ResultatsFinCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatsFinCourseComponent ],
      providers: [GestionnaireBDCourse, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsFinCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
