import { Component, OnInit } from "@angular/core";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
// import { EncadrementCase } from "../encadrementCase";
import { GrilleMultijoueurs } from "./grilleMultijoueurs";

@Component({
  selector: "app-grille-rejointe",
  templateUrl: "./grilleRejointe.component.html",
  styleUrls: ["./grilleRejointe.component.css"]
})

export class GrilleRejointeComponent extends GrilleMultijoueurs implements OnInit {

  public constructor(_servicePointage: InfojoueurService,
                     serviceSocket: number /*type à modifier*/) {
    super(_servicePointage/*, serviceSocket*/);
  }

  public ngOnInit(): void { // Va falloir trouver le moyen de souscrirs aux modifs sans utiliser requete-de-grille

    /* this.mots = this.listeMotsService.mots;
    this.matriceDesMotsSurGrille = this.listeMotsService.matrice;
    // this.remplirPositionLettres(); // JUSTE POUR LA GRILLE DE TEST
    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe((mots) => {
        this.mots = mots;
        this.remplirPositionLettres(); });
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
      }); */
  }

  public retrieveWordFromClick(event: KeyboardEvent): void {
    this.retrieveWordFromClickAbs(event);
    this.envoieMotSelectionne();
  }

  private envoieMotSelectionne(): void {
    // this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    // this.listeMotsService.serviceEnvoieMots(this.mots);
  }
}
