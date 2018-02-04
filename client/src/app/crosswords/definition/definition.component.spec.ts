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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new RequeteDeGrilleService();
    component = new DefinitionComponent(service);
    fakeGrille = new GrilleComponent(service);

    fixture = TestBed.createComponent(DefinitionComponent);
    component = fixture.componentInstance;
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

  describe('Modification de la grille.', () => {
    it('Découvrir les cases dans la grille selon le mot selectionné.', () => {
      component.decouvrirCases(fakeWord);
      console.log(component.matriceDesMotsSurGrille);
      let expectedValues:boolean[] = [true,true,true,true];
      let result:boolean[] = [];
      for(let i:number = 0; i < fakeWord.longeur; i++) {
        console.log(component.matriceDesMotsSurGrille[0][i].caseDecouverte);
        result[i] = component.matriceDesMotsSurGrille[0][i].caseDecouverte;
      }
      expect(result).toEqual(expectedValues);
    });
  });
});
