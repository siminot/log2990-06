import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinitionComponent } from './definition.component';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { Word, LettreGrille } from '../mockObject/word';

describe('DefinitionComponent', () => {
  let service: RequeteDeGrilleService;
  let component: DefinitionComponent;
  let fixture: ComponentFixture<DefinitionComponent>;

  const fakeWord: Word = {
    mot: 'POPO',
    definition: 'ton père en latino',
    vertical: true,
    longeur: 4,
    premierX: 0,
    premierY: 0,
    activer: false
  };

  const realWordFromOurFakeList: Word = {
    mot: 'Tata',
    definition: 'Ni papa, ni  mama',
    vertical: true,
    longeur: 4,
    premierX: 3,
    premierY: 0,
    activer: false
  };

  // lettreDecouverte a true puisque les lettres sont initialisées à true
  // pour qu'on les voit dans la grille. Mettre false quand on initialisera
  // les lettres à false.
  const realLetterFromGrid: LettreGrille = {
    caseDecouverte: false,
    lettre: 'P',
    lettreDecouverte: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionComponent ],
      providers: [ RequeteDeGrilleService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new RequeteDeGrilleService();
    component = new DefinitionComponent(service);
    fixture = TestBed.createComponent(DefinitionComponent);
    fixture.detectChanges();
  });

  describe('Création d\'objets.', () => {
    it('Création d\'objet Definition.', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Accesseurs et mutateurs.', () => {
    it('Accesseur de la liste de mots.', () => {
      expect(component.getMots()).toContain(realWordFromOurFakeList);
    });

    it('Accesseur de la matrice de mots de la grille.', () => {
      const indicePremiereLigne: number = 0;
      expect(component.getMatrice()[indicePremiereLigne]).toContain(realLetterFromGrid);
    });
  });

  describe('Modification de la grille.', () => {
    it('Découvrir les cases dans la grille selon le mot selectionné.', () => {
      component.decouvrirCases(fakeWord);
      const expectedValues: boolean[] = [true, true, true, true];
      const result: boolean[] = [];
      const matrice: Array<Array<LettreGrille>> = component.getMatrice();

      for (let i: number = 0; i < fakeWord.longeur; i++) {
        result[i] = matrice[0][i].caseDecouverte;
      }
      expect(result).toEqual(expectedValues);
    });
    it('Decouvrir les lettre dans la grille selon le mot selectionne', () => { 
      component.decouvrirLettre(fakeWord);
      const expectedValues: boolean[] = [true, true, true, true];
      const result: boolean[] = [];
      const matrice: Array<Array<LettreGrille>> = component.getMatrice();

      for (let i: number = 0; i < fakeWord.longeur; i++) {
        result[i] = matrice[0][i].lettreDecouverte;
    }
      expect(result).toEqual(expectedValues);
  });
});
});
