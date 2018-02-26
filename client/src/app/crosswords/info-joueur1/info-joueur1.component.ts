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
  private _listeMots: Word[];
  private _barreProgression: HTMLElement;

  private _subscriptionNbMotsDecouv: Subscription;
  private _subscriptionListeMots: Subscription;

  public constructor(private _servicePointage: InfojoueurService,
                     private _requeteGrille: RequeteDeGrilleService) {
    this._nomJoueur = "Nom du joueur";
    this._nbMotsDecouverts = 0;
    this._listeMots = [];
   }

  public ngOnInit(): void {
    this.initialiserSouscriptions();
    this._barreProgression = document.getElementById("progress-bar");
  }

  public ngOnDestroy(): void {
    this.desinscrireSouscriptions();
  }

  private initialiserSouscriptions(): void {
    this.souscrireListeDeMots();
    this.souscrireMotsDecouverts();
  }

  private souscrireListeDeMots(): void {
    this._subscriptionListeMots = this._requeteGrille.serviceReceptionMots()
    .subscribe((listeMots) => {
      this._listeMots = listeMots;
    });
  }

  private souscrireMotsDecouverts(): void {
    this._subscriptionNbMotsDecouv = this._servicePointage.serviceReceptionPointage()
      .subscribe((pointage) => {
        this._nbMotsDecouverts = pointage;
        this.majBarreProgression();
    });
  }

  private desinscrireSouscriptions(): void {
    this._subscriptionListeMots.unsubscribe();
    this._subscriptionNbMotsDecouv.unsubscribe();
  }

  public get pourcentagePoint(): number {
    if (this._listeMots.length === 0) {
      return 0;
    } else {
        return Math.round(this._nbMotsDecouverts / this._listeMots.length * CONVERSION_POURCENTAGE);
    }
  }

  public majBarreProgression(): void {
    this._barreProgression.style.width = String(this.pourcentagePoint) + "%";
  }
}
