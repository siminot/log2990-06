import { Component, OnInit } from "@angular/core";
import { ServiceInteractionComponent } from "../../service-interaction-component/service-interaction-component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "../librairieGrille/encadrementCase";
import { GrilleAbs } from "../grilleAbs";

@Component({
  selector: "app-grille-creee",
  templateUrl: "../solo/grille.component.html",
  styleUrls: ["../solo/grille.component.css"]
})

export class GrilleMultijoueurComponent extends GrilleAbs implements OnInit {

  public constructor(_servicePointage: InfojoueurService,
                     /*serviceSocket: number type à modifier,*/
                     private requeteDeGrille: ServiceInteractionComponent) {
    super(_servicePointage/*, serviceSocket*/);
    this.requeteDeGrille.souscrireRequeteGrille();
  }

  public ngOnInit(): void {
    this.mots = this.requeteDeGrille.mots;
    this.matriceDesMotsSurGrille = this.requeteDeGrille.matrice;

    this.subscriptionMots = this.requeteDeGrille.serviceReceptionMots().subscribe((mots) => {
        this.mots = mots;
        this.remplirPositionLettres(); });

    this.subscriptionMatrice = this.requeteDeGrille.serviceReceptionMatriceLettres()
    .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);

    this.subscriptionMotSelec = this.requeteDeGrille.serviceReceptionMotSelectionne()
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
    this.requeteDeGrille.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    this.requeteDeGrille.serviceEnvoieMots(this.mots);
  }
  public enleverSelection(x: string, y: string): void {
    EncadrementCase.appliquerStyleDefautGrille(document);
    super.remettreCasseOpaque();

  }
}
