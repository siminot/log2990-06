import { TestBed, inject } from "@angular/core/testing";
import { InfojoueurService } from "./infojoueur.service";

describe("InfojoueurService", () => {
  let serviceInfoJoueur: InfojoueurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfojoueurService]
    });
  });

  beforeEach(() => {
    serviceInfoJoueur = new InfojoueurService();
  });

  it("should be created", inject([InfojoueurService], (service: InfojoueurService) => {
    expect(service).toBeTruthy();
  }));

  it("Incrémentation du nombre de mots découverts", () => {
    const incrementationMotDecouvert: number = 1;
    serviceInfoJoueur.incrementationNbMotDecouv(incrementationMotDecouvert);
    expect(serviceInfoJoueur["_nbMotsDecouverts"]).toEqual(incrementationMotDecouvert);
  });
});
