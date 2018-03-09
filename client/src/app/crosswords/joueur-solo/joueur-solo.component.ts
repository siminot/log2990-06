import { Component, OnInit } from "@angular/core";
import { GrilleComponent } from "../grille/grille.component";
// import { Subscription } from "rxjs/Subscription";
// import { Mot } from "../objetsTest/mot";
// import { LettreGrille } from "../objetsTest/lettreGrille";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import * as CONST from "../constantes";
// import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { MiseEnEvidence } from "../grille/miseEnEvidence";
import { GrilleFocus } from "../grille/grilleFocus";
import { EncadrementCase } from "../grille/encadrementCase";


@Component({
  selector: "app-joueur-solo'",
  templateUrl: "./joueur-solo.component.html",
  styleUrls: ["./joueur-solo.component.css"]
})
export class JoueurSoloComponent extends GrilleComponent implements OnInit {
  // private _servicePointage: InfojoueurService
  public constructor(protected listeMotsService: RequeteDeGrilleService,
  ) {
    super(listeMotsService);
    this.miseEnEvidence = new MiseEnEvidence();
    this.focus = new GrilleFocus(document, 0);
    this.lockedLetter = [];
    // Mais pourquoi cette boucle ici ?
    for (let i: number = 0; i < CONST.TAILLE_TABLEAU; i++) {
      this.lockedLetter[i] = [];
      for (let j: number = 0; j < CONST.TAILLE_TABLEAU; j++) {
        this.lockedLetter[i][j] = false;
      }
    }
  }

  public ngOnInit(): void {
    this.mots = this.listeMotsService.mots;

    this.matriceDesMotsSurGrille = this.listeMotsService.matrice;
    this.remplirPositionLettres(); // JUSTE POUR LA GRILLE DE TEST

    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe((mots) => {
      this.mots = mots;
      super.remplirPositionLettres();
    });

    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
      .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);

    this.subscriptionMotSelec = this.listeMotsService.serviceReceptionMotSelectionne()
      .subscribe((motSelec) => {
        this.motSelectionne = motSelec;
        this.motSelectionne.mot = this.motSelectionne.mot.toUpperCase();
        EncadrementCase.appliquerStyleDefautGrille(document);

        if (!this.motSelectionne.motTrouve) {
          this.miseEnEvidence.miseEvidenceMot(this.motSelectionne, "red");
          if (document.getElementById("00") !== null) {
            this.focusSurBonneLettre();
          }
        }
      });
  }

  protected envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }
}
