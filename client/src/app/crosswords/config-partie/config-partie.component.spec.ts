import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfigPartieComponent } from "./config-partie.component";

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

    it("devrait modifier la requete", () => {
      component.ajouterDansRequete("/ajout");
      expect(component.getRequete).toEqual("localhost:3000/grille/ajout");
    });

    it("devrait rien ajouter a la requete", () => {
      component.ajouterDansRequete("");
      expect(component.getRequete).toEqual("localhost:3000/grille");
    });

    it("ne devrait pas accepter cette entree", () => {
      component.ajouterDansRequete("ajout");
      expect(component.getRequete).toEqual("localhost:3000/grille");
    });

  });

});
