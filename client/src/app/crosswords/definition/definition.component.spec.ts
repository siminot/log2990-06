import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as assert from 'assert';
import { DefinitionComponent } from './definition.component';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { listeMots } from '../mockObject/mockListWord';
import { Word } from '../mockObject/word';
import { GrilleComponent } from '../grille/grille.component';


describe('DefinitionComponent', () => {
  let service: RequeteDeGrilleService;
  let component: DefinitionComponent;
  let fixture: ComponentFixture<DefinitionComponent>;
  let fakeGrille: GrilleComponent;
  let fakeWord: Word;

  const realWordFromOurFakeList : Word = {
    mot: "Tata",
    definition: "Ni papa, ni  mama",
    vertical: true,
    longeur: 4,
    premierX: 3,
    premierY: 0,
    activer: false 
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionComponent ],
      providers: [RequeteDeGrilleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new RequeteDeGrilleService();
    component = new DefinitionComponent(service);
    fakeGrille = new GrilleComponent(service);

    fixture = TestBed.createComponent(DefinitionComponent);
    //component = fixture.componentInstance;
    fixture.detectChanges();

    fakeWord = {
      mot: "POPO",
      definition: "ton père en latino",
      vertical: true,
      longeur: 4,
      premierX: 0,
      premierY: 0,
      activer: false
    };
  });

  describe('Création d\'objets.', () => {  
    it('Création d\'objet Definition.', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Accesseurs et mutateurs', () => {
    it('Accesseurs de la liste de mots', () => {
      expect(component.getMots()).toContain(realWordFromOurFakeList);
    })
  })

  describe('Modification de la grille.', () => {
    it('Découvrir les cases dans la grille selon le mot selectionné.', () => {
      component.decouvrirCases(fakeWord);
      let expectedValues:boolean[] = [true,true,true,true];
      let result:boolean[] = [];
      for(let i:number = 0; i < fakeWord.longeur; i++) {
        result[i] = component.matriceDesMotsSurGrille[0][i].caseDecouverte;
      }
      expect(result).toEqual(expectedValues);
    });
  });


  // describe('Modification de la grille.', () => {
  //   it('Découvrir les cases dans la grille selon le mot selectionné.', () => {
  //     expect(result).toEqual(expectedValues);
  //   });
  // });
});
