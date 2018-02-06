import { TestBed, inject } from '@angular/core/testing';
import { RequeteDeGrilleService } from './requete-de-grille.service';

describe('RequeteDeGrilleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RequeteDeGrilleService ]
    });
  });

  it('should be created', inject([RequeteDeGrilleService], (service: RequeteDeGrilleService) => {
    expect(service).toBeTruthy();
  }));
});
