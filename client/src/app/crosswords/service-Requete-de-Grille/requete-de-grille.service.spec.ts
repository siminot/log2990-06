import { TestBed, inject } from '@angular/core/testing';
import { RequeteDeGrilleService } from './requete-de-grille.service';
import { GrilleComponent } from '../grille/grille.component';
import { DefinitionComponent } from '../definition/definition.component';

describe('RequeteDeGrilleService', () => {
  let service: RequeteDeGrilleService;
  let grille: GrilleComponent;
  let definition: DefinitionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RequeteDeGrilleService ]
    });
    service = new RequeteDeGrilleService();
    grille = new GrilleComponent(service);
    definition = new DefinitionComponent(service);
  });

  it('should be created', inject([RequeteDeGrilleService], (serv: RequeteDeGrilleService) => {
    expect(serv).toBeTruthy();
  }));

  describe('Construction des objets.', () => {
    it('Construction du service réussie.', () => {
      expect(service).toBeTruthy();
    });
    it('Construction du composant grille réussie.', () => {
      expect(grille).toBeTruthy();
    });
  });

  describe('Envoie de la liste de mots aux différents composants.', () => {
    it('Envoie de la liste de mots au composant de la grille.', () => {
      service.serviceEnvoieMots(service.getMots());
      expect(grille.getListeMots()).toEqual(service.getMots());
    });

    it('Envoie de la liste de mots au composant de définition.', () => {
      service.serviceEnvoieMots(service.getMots());
      expect(definition.getMots()).toEqual(service.getMots());
    });
  });

  describe('Envoie de la matrice aux différents composants.', () => {
    it('Envoie de la matrice au composant de la grille.', () => {
      service.serviceEnvoieMatriceLettres(service.getMatrice());
      expect(grille.getMatrice()).toEqual(service.getMatrice());
    });

    it('Envoie de la matrice au composant de définition.', () => {
      service.serviceEnvoieMatriceLettres(service.getMatrice());
      expect(definition.getMatrice()).toEqual(service.getMatrice());
    });
  });
});
