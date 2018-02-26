import { TestBed, inject } from "@angular/core/testing";
import { RequeteDeGrilleService } from "./requete-de-grille.service";
import { GrilleComponent } from "../grille/grille.component";
import { DefinitionComponent } from "../definition/definition.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";

describe("RequeteDeGrilleService", () => {
  let serviceGrille: RequeteDeGrilleService;
  let grille: GrilleComponent;
  let definition: DefinitionComponent;
  let infojoueur: InfojoueurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RequeteDeGrilleService, HttpeReqService ]
    });
  });

  beforeEach(inject([RequeteDeGrilleService], (service: RequeteDeGrilleService) => {
    serviceGrille = service;
    infojoueur = new InfojoueurService();
  })
);

  it("should be created", () => {
      grille = new GrilleComponent(serviceGrille, infojoueur);
      definition = new DefinitionComponent(serviceGrille);
      expect(serviceGrille).toBeDefined();
    }
  );

  describe("Construction des objets.", () => {
    it("Construction du service réussie.", () => {
      expect(serviceGrille).toBeTruthy();
    });

    it("Construction du composant grille réussie.", () => {
      expect(grille).toBeTruthy();
    });
  });

  describe("Envoie de la liste de mots aux différents composants.", () => {
    // it("Envoie de la liste de mots au composant de la grille.", () => {
    //   service.serviceEnvoieMots(service.getMots());
    //   expect(grille.getListeMots()).toEqual(service.getMots());
    // });

    it("Envoie de la liste de mots au composant de définition.", () => {
      serviceGrille["serviceEnvoieMots"](serviceGrille["mots"]);
      expect(definition["mots"]).toEqual(serviceGrille["mots"]);
    });
  });

  describe("Envoie de la matrice aux différents composants.", () => {
    // it("Envoie de la matrice au composant de la grille.", () => {
    //   service.serviceEnvoieMatriceLettres(service.getMatrice());
    //   expect(grille.getMatrice()).toEqual(service.getMatrice());
    // });

    it("Envoie de la matrice au composant de définition.", () => {
      serviceGrille.serviceEnvoieMatriceLettres(serviceGrille.matrice);
      expect(definition["mots"]).toEqual(serviceGrille["mots"]);
    });
  });

  describe("Réception d'information de la part des composants.", () => {
    it("Reception d'une liste de mots de la part du composant de définition.", () => {
      definition["envoieMotSelectionne"]();
      expect(serviceGrille["mots"]).toEqual(definition["mots"]);
    });

    it("Reception de la matrice de la part du composant de définition.", () => {
      definition["envoieMatrice"]();
      expect(serviceGrille["mots"]).toEqual(definition["mots"]);
    });
  });
});
