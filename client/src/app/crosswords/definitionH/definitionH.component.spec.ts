import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { DefinitionHComponent } from "./definitionH.component";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("DefinitioHComponent", () => {
  let component: DefinitionHComponent;
  let fixture: ComponentFixture<DefinitionHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionHComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ RequeteDeGrilleService, HttpeReqService ]
    })
    .compileComponents();
  }));

  beforeEach(inject([RequeteDeGrilleService], (service: RequeteDeGrilleService) => {
    fixture = TestBed.createComponent(DefinitionHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
);

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
