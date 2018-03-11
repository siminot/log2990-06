import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { DefinitionComponent } from "./definition.component";
import { RequeteDeGrilleAbs } from "../service-Requete-de-Grille/requete-de-grilleAbs";
import { Mot } from "../objetsTest/mot";
import { LettreGrille } from "../objetsTest/lettreGrille";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { listeMotsLongue, grilleLettres } from "../objetsTest/objetsTest";

describe("DefinitionComponent", () => {
  let component: DefinitionComponent;
  let fixture: ComponentFixture<DefinitionComponent>;

  const INDICE_MOT: number = 6;
  const fakeWord: Mot = listeMotsLongue[INDICE_MOT];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ RequeteDeGrilleAbs, HttpeReqService ]
    })
    .compileComponents()
    .catch(() => { throw new Error("Erreur de la creation du test"); });
  }));

  beforeEach(inject([RequeteDeGrilleAbs], (service: RequeteDeGrilleAbs) => {
    component = new DefinitionComponent(service);
    component["matriceDesMotsSurGrille"] = grilleLettres;
    component["mots"] = listeMotsLongue;
    fixture = TestBed.createComponent(DefinitionComponent);
    fixture.detectChanges();
  })
);

  describe("Création d\"objets.", () => {
    it("Création d\"objet Definition.", () => {
      expect(component).toBeTruthy();
    });
  });

  describe("Modification de la grille.", () => {
    it("Découvrir les cases dans la grille selon le mot selectionné.", () => {
      component["decouvrirCases"](fakeWord);
      const expectedValues: boolean[] = [true, true, true, true];
      const result: boolean[] = [];
      const matrice: Array<Array<LettreGrille>> = component["matriceDesMotsSurGrille"];

      for (let i: number = 0; i < fakeWord.longueur; i++) {
        result[i] = matrice[fakeWord.premierX][i + fakeWord.premierY].caseDecouverte;
      }
      expect(result).toEqual(expectedValues);
    });

    it("remettre toute les caseDecouverte a false", () => {
      const matrice: Array<Array<LettreGrille>> = component["matriceDesMotsSurGrille"];
      matrice[0][0] = {
        caseDecouverte: true,
        lettre: "P",
        lettreDecouverte: true
      };
      component["cacherCases"]();

      expect(matrice[0][0].caseDecouverte).toBeFalsy();
    });
  });
});
