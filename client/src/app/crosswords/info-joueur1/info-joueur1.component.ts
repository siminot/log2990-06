import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { Word } from "../mockObject/word";
import { CONVERSION_POURCENTAGE } from "../constantes";

@Component({
  selector: "app-info-joueur1",
  templateUrl: "./info-joueur1.component.html",
  styleUrls: ["./info-joueur1.component.css"]
})
export class InfoJoueur1Component implements OnInit, OnDestroy {
  private _nomJoueur: string;
  private _nbMotsDecouverts: number;
  private _pourcentagePoint: number;
  private _listeMots: Word[];

  private _subscriptionNbMotsDecouv: Subscription;
  private _subscriptionListeMots: Subscription;

  public constructor(private _servicePointage: InfojoueurService /*,
  private _requeteGrille: RequeteDeGrilleService */) {
    this._nomJoueur = "Nom du joueur";
    this._nbMotsDecouverts = 0;
    this._pourcentagePoint = 0;
    this._listeMots = [];
   }

  public ngOnInit(): void {
    this._subscriptionListeMots = this._requeteGrille.serviceReceptionMots()
      .subscribe((listeMots) => {
        this._listeMots = listeMots;
    });

    this._subscriptionNbMotsDecouv = this._servicePointage.serviceReceptionPointage()
      .subscribe((pointage) => {
        this._nbMotsDecouverts = pointage;
        this.calculerPourcentagePoint();
        this.majBarreProgression();
    });
  }

  public calculerPourcentagePoint(): void {
    console.log(this._nbMotsDecouverts / this._listeMots.length);
    this._pourcentagePoint = Math.round(this._nbMotsDecouverts / this._listeMots.length * CONVERSION_POURCENTAGE);
    console.log(this._pourcentagePoint);
  }

  public majBarreProgression(): void {
    const barreProgression: HTMLElement = document.getElementById("progress-bar");
    const str: string = String(this._pourcentagePoint) + "%";
    barreProgression.style.width = str;
  }

  public ngOnDestroy(): void {
    this._subscriptionNbMotsDecouv.unsubscribe();
  }
}
