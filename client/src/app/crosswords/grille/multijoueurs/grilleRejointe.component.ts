import { Component, OnInit } from "@angular/core";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "../encadrementCase";
// import { GrilleMultijoueurs } from "./grilleMultijoueurs";
import { RequeteDeGrilleAbs } from "../../service-Requete-de-Grille/requete-de-grilleAbs";
import { GrilleAbs } from "../grilleAbs";

@Component({
  selector: "app-grille-rejointe",
  templateUrl: "../grille.component.html",
  styleUrls: ["../grille.component.css"]
})

export class GrilleRejointeComponent extends GrilleAbs implements OnInit {

  public constructor(_servicePointage: InfojoueurService,
                     private listeMotsService: RequeteDeGrilleAbs
                     /*serviceSocket: type à déterminer*/) {
    super(_servicePointage/*, serviceSocket*/);
    this.listeMotsService.souscrireServiceSocket();
  }

  public ngOnInit(): void { // Va falloir trouver le moyen de souscrirs aux modifs sans utiliser requete-de-grille

    this.mots = this.listeMotsService.mots;
    this.matriceDesMotsSurGrille = this.listeMotsService.matrice;
    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe((mots) => {
      this.mots = mots;
      this.remplirPositionLettres();
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
    return;
  }

  // private demandeDeMot(): void {
  //   //
  // }

  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    // this.listeMotsService.serviceEnvoieMots(this.mots);
  }
}
