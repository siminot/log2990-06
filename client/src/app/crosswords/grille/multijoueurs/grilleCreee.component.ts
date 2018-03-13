import { Component, OnInit } from "@angular/core";
import { RequeteDeGrilleAbs } from "../../service-Requete-de-Grille/requete-de-grilleAbs";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "../encadrementCase";
// import { GrilleMultijoueurs } from "./grilleMultijoueurs";
import { GrilleAbs } from "../grilleAbs";

@Component({
  selector: "app-grille-creee",
  templateUrl: "../grille.component.html",
  styleUrls: ["../grille.component.css"]
})

export class GrilleCreeeComponent extends GrilleAbs implements OnInit {

  public constructor(_servicePointage: InfojoueurService,
                     /*serviceSocket: number type à modifier,*/
                     private listeMotsService: RequeteDeGrilleAbs) {
    super(_servicePointage/*, serviceSocket*/);
    this.listeMotsService.souscrireRequeteGrille();
  }

  public ngOnInit(): void {
    this.mots = this.listeMotsService.mots;
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
      });
  }

  protected envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }
  public enleverSelection(x: string, y: string): void {
    EncadrementCase.appliquerStyleDefautGrille(document);
    super.remettreCasseOpaque();

  }
}
