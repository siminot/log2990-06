import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleComponent } from './grille.component';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';

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

  describe('Partage avec le service.', () => {
    it('Envoie de mot vers le service.', () => {
      console.log(serviceGrille.getMatrice());
    });
  });
});
