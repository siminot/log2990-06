import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { ConfigPartieComponent, REQUETE_INIT } from "./config-partie.component";
// import { ProviderAstType } from "@angular/compiler";
import { HttpClientTestingModule } from "@angular/common/http/testing";

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
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("test ajoutDansRequete", () => {

    component = new ConfigPartieComponent(reqService);
    const AJOUT: string = "ajout";
    const REQUETE_FINALE: string = REQUETE_INIT + AJOUT;

    it("devrait rien ajouter a la requete", () => {
      const REQUETE_AVANT: string = component["requete"];
      component.ajouterDifficulte("");
      expect(component["requete"]).toEqual(REQUETE_AVANT);
    });

    it("devrait modifier la requete", () => {
      component.ajouterDifficulte(AJOUT);
      expect(component["requete"]).toEqual(REQUETE_FINALE);
    });

    it("ne devrait pas accepter cette entree", () => {
      component.ajouterDifficulte("ajout");
      expect(component["requete"]).toEqual(REQUETE_FINALE);
    });
  });
});
