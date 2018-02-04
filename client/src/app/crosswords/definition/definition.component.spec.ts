import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as assert from 'assert';
import { DefinitionComponent } from './definition.component';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { listeMots } from '../mockObject/mockListWord';

describe('DefinitionComponent', () => {
  let service: RequeteDeGrilleService = new RequeteDeGrilleService();
  let component: DefinitionComponent = new DefinitionComponent(service);
  let fixture: ComponentFixture<DefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Création d\'objets.', () => {  
    it('objet Definition créé', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Modification de la grille.', () => {
    it('Découvrir les cases dans la grille selon le mot selectionné.', () => {
      
      assert.ok(true);
    });
  });
});
