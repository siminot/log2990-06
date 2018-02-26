import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
// import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";

@Component({
  selector: "app-info-joueur1",
  templateUrl: "./info-joueur1.component.html",
  styleUrls: ["./info-joueur1.component.css"]
})
export class InfoJoueur1Component implements OnInit, OnDestroy {
  private _nomJoueur: string;
  private _pointage: number;
  private _pourcentagePoint: number;

  private _subscriptionPointage: Subscription;
  // private _subscriptionListeMots: Subscription;

  public constructor(private _servicePointage: InfojoueurService /*,
  private _requeteGrille: RequeteDeGrilleService */) {
    this._nomJoueur = "Nom du joueur";
    this._pointage = 0;
    this._pourcentagePoint = 0;
   }

  public ngOnInit(): void {
    this._subscriptionPointage = this._servicePointage.serviceReceptionPointage()
      .subscribe((pointage) => {
        this._pointage = pointage;
        this.calculerPourcentagePoint();
        this.majBarreProgression();
      });
  }

  public calculerPourcentagePoint(): void {
    this._pourcentagePoint = this._pointage;
  }

  public majBarreProgression(): void {
    const barreProgression: HTMLElement = document.getElementById("progress-bar");
    const str: string = String(this._pourcentagePoint) + "%";
    barreProgression.style.width = str;
  }

  public ngOnDestroy(): void {
    this._subscriptionPointage.unsubscribe();
  }
}
