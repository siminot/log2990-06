import { Component } from "@angular/core";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { InfoPartieAbs } from "../../info-partie/info-partie-abs";

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
                     /*protected _difficulte: string,*/
                     /*private serviceSocket: type a determiner*/) {
    super(_servicePointage);
    this._motsDecouvertsJoueur1 = 0;
    this._motsDecouvertsJoueur2 = 0;
    this._nomJoueur1 = "Joueur 1";
    this._nomJoueur2 = "Joueur 2";
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
}
