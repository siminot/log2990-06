import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TableauMeilleursTempsComponent } from "./tableau-meilleurs-temps.component";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TableauMeilleursTempsComponent", () => {
  let component: TableauMeilleursTempsComponent;
  let fixture: ComponentFixture<TableauMeilleursTempsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ TableauMeilleursTempsComponent ],
      providers: [ GestionnaireBDCourse ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauMeilleursTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
