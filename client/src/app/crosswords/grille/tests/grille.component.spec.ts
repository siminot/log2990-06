import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { GrilleComponent } from "../solo/grille.component";
import { RequeteDeGrilleAbs } from "../../service-Requete-de-Grille/requete-de-grilleAbs";
import { listeMotsLongue, grilleLettres } from "../../objetsTest/objetsTest";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ServiceHttp } from "../../serviceHttp/http-request.service";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";

describe("GrilleComponent", () => {
  let component: GrilleComponent;
  let serviceGrille: RequeteDeGrilleAbs;
  let fixture: ComponentFixture<GrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrilleComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ RequeteDeGrilleAbs, ServiceHttp, InfojoueurService ]
    })
    .compileComponents()
    .catch(() => { throw new Error("Erreur de la creation du test"); });
  }));

  beforeEach(inject([RequeteDeGrilleAbs], (service: RequeteDeGrilleAbs) => {
    service["_mots"] = listeMotsLongue;
    service["matriceDesMotsSurGrille"] = grilleLettres;
    serviceGrille = service;
    fixture = TestBed.createComponent(GrilleComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component["motSelectionne"] = listeMotsLongue[0];
    component["remplirPositionLettres"]();
    })
  );

  describe("Construction d'objet", () => {
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
      component["focus"]["positionCourante"] = 0;
      const positionInit: number = component["focus"]["positionCourante"];
      const touche: KeyboardEvent = new KeyboardEvent("keydown", {
        "key": "E"
      });
      component.manageKeyEntry(touche);
      expect(component["focus"]["positionCourante"]).toBeGreaterThan(positionInit);
    });

    it("Effacement d'une lettre", () => {
      component["focus"]["positionCourante"] = 1;
      const positionInit: number = component["focus"]["positionCourante"];
      const touche: KeyboardEvent = new KeyboardEvent("keydown", {
        "key": "Backspace"
      });
      component.manageKeyEntry(touche);
      expect(component["focus"]["positionCourante"]).toBeLessThan(positionInit);
    });

    it("Il ne se passe rien quand une touche invalide est appuyee", () => {
      component["focus"]["positionCourante"] = 0;
      const positionInit: number = component["focus"]["positionCourante"];
      const touche: KeyboardEvent = new KeyboardEvent("keydown", {
        "key": "2"
      });
      component.manageKeyEntry(touche);
      expect(component["focus"]["positionCourante"]).toEqual(positionInit);
    });

    it("Il ne se passe rien quand le backspace est appuyé si on est déjà au début du mot", () => {
      component["focus"]["positionCourante"] = 0;
      const positionInit: number = component["focus"]["positionCourante"];
      const touche: KeyboardEvent = new KeyboardEvent("keydown", {
        "key": "Backspace"
      });
      component.manageKeyEntry(touche);
      expect(component["focus"]["positionCourante"]).toEqual(positionInit);
    });
  });
});
