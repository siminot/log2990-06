import { Component } from "@angular/core";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { InfoPartieAbs } from "../../info-partie/info-partie-abs";
import { SocketService } from "../../service-socket/service-socket";
import { PaquetPartie } from "../../objetsTest/paquetPartie";
import { Router } from "@angular/router";

@Component({
  selector: "app-info-partie-multijoueur",
  templateUrl: "./info-partie-multijoueur.component.html",
  styleUrls: ["./info-partie-multijoueur.component.css"]
})

export class InfoPartieMultijoueurComponent extends InfoPartieAbs {

  private _motsDecouvertsJoueur1: number;
  private _motsDecouvertsJoueur2: number;
  private _nomJoueur1: string;
  private _nomJoueur2: string;

  public constructor(_servicePointage: InfojoueurService,
                     private socketClient: SocketService,
                     private router: Router) {
    super(_servicePointage);
    this._motsDecouvertsJoueur1 = 0;
    this._motsDecouvertsJoueur2 = 0;
    this._nomJoueur1 = "Joueur 1";
    this._nomJoueur2 = "Joueur 2";
    this.chargerNomsJoueurs();
    this.miseAJourScores();
    // this.finPartie();
   }

  protected souscrireListeDeMots(): void {
/*     this._subscriptionListeMots = this._requeteGrille.serviceReceptionMots()
    .subscribe((listeMots) => {
      this._listeMots = listeMots;
    }); */
    return;
  }

  protected souscrireMotsDecouverts(): void {
/*     this._subscriptionNbMotsDecouv = this._servicePointage.serviceReceptionPointage()
      .subscribe((pointage) => {
        this._nbMotsDecouverts = pointage;
    }); */
    return;
  }

  private chargerNomsJoueurs(): void {
    this.socketClient.telechargerPaquetPartie().subscribe( (paquet: PaquetPartie) => {
      this._nomJoueur1 = paquet.nomJoeurs[0];
      this._nomJoueur2 = paquet.nomJoeurs[1];
      this._difficulte = paquet.difficultee;
    });
  }

  private miseAJourScores(): void {
    this.socketClient.recevoirScore().subscribe( (nouveauScores: number[]) => {
      this._motsDecouvertsJoueur1 = nouveauScores[0];
      this._motsDecouvertsJoueur2 = nouveauScores[1];
    });
  }

/*   private finPartie(): void {
    this.socketClient.finPartie().subscribe( (resultat: string) => {
      console.log("fin partie");
      this.router.navigateByUrl("FinPartieMulti");
    });
  } */
}
