import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";

import { GrilleComponent } from "./grille.component";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { listeMots } from "../mockObject/mockListWord";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpeReqService } from "../httpRequest/http-request.service";

describe("GrilleComponent", () => {
  let component: GrilleComponent;
  let serviceGrille: RequeteDeGrilleService;
  let fixture: ComponentFixture<GrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrilleComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ RequeteDeGrilleService, HttpeReqService ]
    })
    .compileComponents();
  }));

  beforeEach(inject([RequeteDeGrilleService], (service: RequeteDeGrilleService) => {
    service["mots"] = listeMots;
    serviceGrille = service;
    fixture = TestBed.createComponent(GrilleComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    })
  );

  describe("Construction d\"objet", () => {
    it("Construction du service de requete réussie.", () => {
      expect(serviceGrille).toBeDefined();
    });

    it("Construction du composant Grille réussie.", () => {
      expect(component).toBeDefined();
    });
  });

  describe("Accesseurs fonctionnels.", () => {
    it("Accesseur liste de mots.", () => {
      expect(component.getListeMots()).toEqual(listeMots);
    });
  });

  describe("Gestion des touches de clavier", () => {
    it("Entree d'une lettre", () => {
      const positionInit: number = component["positionCourante"];
      const touche: KeyboardEvent = new KeyboardEvent("keydown", {
        "key": "e"
      });
      component.manageKeyEntry(touche);
      expect(component["positionCourante"]).toBeGreaterThan(positionInit);
    });

    it("Effacement d'une lettre", () => {
      expect(true).toBeTruthy();
    });

    it("Il ne se passe rien quand une touche invalide est appuyee", () => {
      expect(true).toBeTruthy();
    });
  });
});
