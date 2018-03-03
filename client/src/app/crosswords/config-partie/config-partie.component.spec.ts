import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { ConfigPartieComponent } from "./config-partie.component";
// import { ProviderAstType } from "@angular/compiler";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Difficulte } from "../../../../../common/communication/IConfigurationPartie";

describe("ConfigPartieComponent", () => {
  let component: ConfigPartieComponent;
  let fixture: ComponentFixture<ConfigPartieComponent>;
  let reqService: HttpeReqService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPartieComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [HttpeReqService]

    })

    .compileComponents()

    .catch();
  }));

  beforeEach(inject([HttpeReqService], (service: HttpeReqService) => {
      fixture = TestBed.createComponent(ConfigPartieComponent);
      // component = fixture.componentInstance;
      reqService = service;
      fixture.detectChanges();
      component = new ConfigPartieComponent(reqService);

  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ajouterDifficulte()", () => {

    it("devrait mettre a jour la requete", () => {
      component.ajouterDifficulte(Difficulte.facile);
      expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.facile);
      component.ajouterDifficulte(Difficulte.normal);
      expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.normal);
      component.ajouterDifficulte(Difficulte.difficile);
      expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.difficile);
    });

    it("ne devrait pas mettre a jour la requete", () => {
      const DIFFICULTE_AVANT: Difficulte = component["serviceHTTP"].difficulte;
      component.ajouterDifficulte(undefined);
      expect(component["serviceHTTP"].difficulte).toEqual(DIFFICULTE_AVANT);
    });

  });
});
