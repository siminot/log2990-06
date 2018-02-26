import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfigPartieComponent, REQUETE_INIT } from "./config-partie.component";

describe("ConfigPartieComponent", () => {
  let component: ConfigPartieComponent;
  let fixture: ComponentFixture<ConfigPartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPartieComponent ]
    })
    .compileComponents()
    .catch();
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

    component = new ConfigPartieComponent();
    const AJOUT: string = "ajout";
    const REQUETE_FINALE: string = REQUETE_INIT + AJOUT;

    it("devrait rien ajouter a la requete", () => {
      const REQUETE_AVANT: string = component.requete;
      component.ajouterDifficulte("");
      expect(component.requete).toEqual(REQUETE_AVANT);
    });

    it("devrait modifier la requete", () => {
      component.ajouterDifficulte(AJOUT);
      expect(component.requete).toEqual(REQUETE_FINALE);
    });

    it("ne devrait pas accepter cette entree", () => {
      component.ajouterDifficulte("ajout");
      expect(component.requete).toEqual(REQUETE_FINALE);
    });
  });
});
