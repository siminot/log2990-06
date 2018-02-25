import { TestBed, inject } from '@angular/core/testing';

import { InfojoueurService } from './infojoueur.service';

describe('InfojoueurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfojoueurService]
    });
  });

  it('should be created', inject([InfojoueurService], (service: InfojoueurService) => {
    expect(service).toBeTruthy();
  }));
});
