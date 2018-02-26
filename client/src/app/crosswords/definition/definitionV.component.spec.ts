import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DefinitionVComponent } from "./definitionV.component";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { Word, LettreGrille } from "../mockObject/word";

describe("DefinitionComponent", () => {
  let service: RequeteDeGrilleService;
  let component: DefinitionVComponent;
  let fixture: ComponentFixture<DefinitionVComponent>;

  const fakeWord: Word = {
    mot: "POPO",
    definition: "ton père en latino",
    estVertical: true,
    longeur: 4,
    premierX: 0,
    premierY: 0,
    activer: false,
    motTrouve: false
  };

  const realWordFromOurFakeList: Word = {
    mot: "Tata",
    definition: "Ni papa, ni  mama",
    estVertical: true,
    longeur: 4,
    premierX: 3,
    premierY: 0,
    activer: false,
    motTrouve: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionVComponent ],
      providers: [ RequeteDeGrilleService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new RequeteDeGrilleService();
    component = new DefinitionVComponent(service);
    fixture = TestBed.createComponent(DefinitionVComponent);
    fixture.detectChanges();
  });

  describe("Création d\"objets.", () => {
    it("Création d\"objet Definition.", () => {
      expect(component).toBeTruthy();
    });
  });

  describe("Modification de la grille.", () => {
    it("Découvrir les cases dans la grille selon le mot selectionné.", () => {
      component.decouvrirCases(fakeWord);
      const expectedValues: boolean[] = [true, true, true, true];
      const result: boolean[] = [];
      const matrice: Array<Array<LettreGrille>> = component.getMatrice();

      for (let i: number = 0; i < fakeWord.longeur; i++) {
        result[i] = matrice[0][i].caseDecouverte;
      }
      expect(result).toEqual(expectedValues);
    });
    it("Decouvrir les lettre dans la grille selon le mot selectionne", () => {
      component.decouvrirLettre(fakeWord);
      const expectedValues: boolean[] = [true, true, true, true];
      const result: boolean[] = [];
      const matrice: Array<Array<LettreGrille>> = component.getMatrice();

      for (let i: number = 0; i < fakeWord.longeur; i++) {
        result[i] = matrice[0][i].lettreDecouverte;
    }
      expect(result).toEqual(expectedValues);
  });
    it("remettre toute les caseDecouverte a false", () => {
      const matrice: Array<Array<LettreGrille>> = component.getMatrice();
      matrice[0][0] = {
        caseDecouverte: true,
        lettre: "P",
        lettreDecouverte: true
      };
      component.cacherCases();

      expect(matrice[0][0].caseDecouverte).toBeFalsy();
});

    it("Verifier le input de l/utilisateur", () => {
      component.setMotSelectionne(realWordFromOurFakeList);
      component.verifierTentative(realWordFromOurFakeList.mot);
      const aVerifier: String = component.getReponse();
      const verification: String = "Bonne Reponse !";
      expect(aVerifier).toEqual(verification);
});
});
});
