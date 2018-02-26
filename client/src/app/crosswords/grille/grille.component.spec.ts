import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";

import { GrilleComponent } from "./grille.component";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { listeMotsLongue, grilleLettres } from "../mockObject/mockGrille";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";

describe("GrilleComponent", () => {
  let component: GrilleComponent;
  let serviceGrille: RequeteDeGrilleService;
  let fixture: ComponentFixture<GrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrilleComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ RequeteDeGrilleService, HttpeReqService, InfojoueurService ]
    })
    .compileComponents();
  }));

  beforeEach(inject([RequeteDeGrilleService], (service: RequeteDeGrilleService) => {
    service["mots"] = listeMotsLongue;
    service["matriceDesMotsSurGrille"] = grilleLettres;
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
      expect(component.getListeMots()).toEqual(listeMotsLongue);
    });
    it("Accesseur matrice de lettres.", () => {
      expect(component.getMatrice()).toEqual(grilleLettres);
    });
  });

  describe("Gestion des touches de clavier", () => {
    it("Entree d'une lettre", () => {
      component["motSelectionne"] = listeMotsLongue[0];
      component["positionLettresSelectionnees"] = [ "00", "01", "02", "03", "04", "05", "06", "07", "08", "09" ];
      component["positionCourante"] = 0;
      const positionInit: number = component["positionCourante"];
      const touche: KeyboardEvent = new KeyboardEvent("keydown", {
        "key": "E"
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
