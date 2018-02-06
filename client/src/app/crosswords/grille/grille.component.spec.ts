import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleComponent } from './grille.component';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { listeMots } from '../mockObject/mockListWord';

describe('GrilleComponent', () => {
  let component: GrilleComponent;
  let serviceGrille: RequeteDeGrilleService;
  let fixture: ComponentFixture<GrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrilleComponent ],
      providers: [ RequeteDeGrilleService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    serviceGrille = new RequeteDeGrilleService();
    component = new GrilleComponent(serviceGrille);

    fixture = TestBed.createComponent(GrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Construction d\'objet', () => {
    it('Construction du service de requete réussie.', () => {
      expect(serviceGrille).toBeTruthy();
    });

    it('Construction du composant Grille réussie.', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Accesseurs fonctionnels.', () => {
    it('Accesseur liste de mots.', () => {
      expect(component.getListeMots()).toEqual(listeMots);
    });
  });
});
