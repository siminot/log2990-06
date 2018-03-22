import { Component, OnInit } from "@angular/core";
import { ServiceInteractionComponent } from "../../service-interaction-component/service-interaction-component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "../librairieGrille/encadrementCase";
import { GrilleAbs } from "../grilleAbs";
import { SocketService } from "../../service-socket/service-socket";
import { PaquetPartie } from "../../objetsTest/paquetPartie";
@Component({
  selector: "app-grille-multi",
  templateUrl: "../solo/grille.component.html",
  styleUrls: ["../solo/grille.component.css"]
})

export class GrilleMultijoueurComponent extends GrilleAbs implements OnInit {

  public constructor(_servicePointage: InfojoueurService,
                     private serviceSocket: SocketService,
                     private serviceInteraction: ServiceInteractionComponent) {
    super(_servicePointage/*, serviceSocket*/);
    this.serviceSocket.commencerPartie();

  }


  public ngOnInit(): void {
    this.mots = this.serviceInteraction.mots;
    this.matriceDesMotsSurGrille = this.serviceInteraction.matrice;

    this.subscriptionMots = this.serviceInteraction.serviceReceptionMots().subscribe((mots) => {
      this.mots = mots;
      this.remplirPositionLettres();
    });

    this.subscriptionMatrice = this.serviceInteraction.serviceReceptionMatriceLettres()
      .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);

    this.subscriptionMotSelec = this.serviceInteraction.serviceReceptionMotSelectionne()
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
    this.chargerGrille();
  }

  protected envoieMotSelectionne(): void {
    this.serviceInteraction.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    this.serviceInteraction.serviceEnvoieMots(this.mots);
  }

  public enleverSelection(x: string, y: string): void {
    EncadrementCase.appliquerStyleDefautGrille(document);
    super.remettreCasseOpaque();

  }

  private chargerGrille(): void {
    this.serviceSocket.telechargerGrille().subscribe((paquet: PaquetPartie) => {
      this.mots = paquet.grilleDeJeu;
      console.log(this.mots);
      this.serviceInteraction.serviceEnvoieMots(this.mots);
      this.serviceInteraction.souscrireServiceSocket();
      this.matriceDesMotsSurGrille = this.serviceInteraction.matrice;
    });
  }
}
