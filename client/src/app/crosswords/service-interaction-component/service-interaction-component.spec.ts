import { TestBed, inject } from "@angular/core/testing";
import { RequeteDeGrilleAbs } from "./requete-de-grilleAbs";
import { GrilleComponent } from "../grille/solo/grille.component";
import { DefinitionComponent } from "../definition/definition.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ServiceHttp } from "../serviceHttp/http-request.service";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { listeMotsLongue, grilleLettres } from "../objetsTest/objetsTest";

describe("RequeteDeGrilleService", () => {
  let serviceGrille: RequeteDeGrilleAbs;
  let grille: GrilleComponent;
  let definition: DefinitionComponent;
  let infojoueur: InfojoueurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RequeteDeGrilleAbs, ServiceHttp ]
    });
  });

  beforeEach(inject([ServiceHttp], (service: ServiceHttp) => {
    serviceGrille = new RequeteDeGrilleAbs(service);
    serviceGrille["_mots"] = listeMotsLongue;
    serviceGrille["matriceDesMotsSurGrille"] = grilleLettres;
    infojoueur = new InfojoueurService();
    definition = new DefinitionComponent(serviceGrille);
    definition["motSelectionne"] = listeMotsLongue[1];
    grille = new GrilleComponent(serviceGrille, infojoueur);
    grille.ngOnInit();
    grille["motSelectionne"] = listeMotsLongue[1];

  })
);

  describe("Construction des objets.", () => {
    it("Construction du service réussie.", () => {
      expect(serviceGrille).toBeDefined();
    });

    it("Construction du composant grille réussie.", () => {
      expect(grille).toBeDefined();
    });

    it("Construction du composant définition réussie.", () => {
      expect(definition).toBeDefined();
    });
  });

  describe("Envoi de la liste de mots aux différents composants.", () => {
    it("Envoi de la liste de mots au composant de la grille.", () => {
      serviceGrille["_mots"][0].motTrouve = true;
      serviceGrille["serviceEnvoieMots"](serviceGrille.mots);
      expect(grille.getListeMots()).toEqual(serviceGrille.mots);
      expect(grille.getMatrice()).toEqual(serviceGrille.matrice);
    });

    it("Envoi de la liste de mots au composant de définition.", () => {
      serviceGrille["_mots"][0].motTrouve = true;
      serviceGrille["serviceEnvoieMots"](serviceGrille.mots);
      expect(definition["mots"]).toEqual(serviceGrille.mots);
      expect(definition["matriceDesMotsSurGrille"]).toEqual(serviceGrille.matrice);
    });
  });

  describe("Réception d'information de la part des composants.", () => {
    it("Reception du mot sélectionné de la part du composant de grille.", () => {
      definition["motSelectionne"] = listeMotsLongue[0];
      definition["envoieMotSelectionne"]();
      expect(grille["motSelectionne"]).toEqual(listeMotsLongue[0]);
    });

    it("Reception du mot sélectionné de la part du composant de définition.", () => {
      grille["motSelectionne"] = listeMotsLongue[0];
      grille["envoieMotSelectionne"]();
      expect(definition["motSelectionne"]).toEqual(listeMotsLongue[0]);
    });

    it("Reception de la matrice de la part du composant de grille.", () => {
      definition["matriceDesMotsSurGrille"].fill(grilleLettres[0]);
      definition["envoieMatrice"]();
      expect(grille["matriceDesMotsSurGrille"]).toEqual(definition["matriceDesMotsSurGrille"]);
    });

    it("Reception de la matrice de la part du composant de définition.", () => {
      grille["matriceDesMotsSurGrille"].fill(grilleLettres[0]);
      definition["envoieMatrice"]();
      expect(definition["matriceDesMotsSurGrille"]).toEqual(grille["matriceDesMotsSurGrille"]);
    });
  });
});
