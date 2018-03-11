import { Component, OnInit } from "@angular/core";
import { RequeteDeGrilleService } from "../../service-Requete-de-Grille/requete-de-grille.service";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "../encadrementCase";
import { GrilleMultijoueurs } from "./grilleMultijoueurs";

@Component({
  selector: "app-grille-creee",
  templateUrl: "./grilleCreee.component.html",
  styleUrls: ["./grilleCreee.component.css"]
})

export class GrilleCreeeComponent extends GrilleMultijoueurs implements OnInit {

  public constructor(_servicePointage: InfojoueurService,
                     serviceSocket: number /*type à modifier*/,
                     private listeMotsService: RequeteDeGrilleService) {
    super(_servicePointage/*, serviceSocket*/);
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
}
