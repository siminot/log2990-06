import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { Mot } from "../objetsTest/mot";
import * as CONST from "../constantes";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-info-joueur1",
  templateUrl: "./info-joueur1.component.html",
  styleUrls: ["./info-joueur1.component.css"]
})

export class InfoJoueur1Component implements OnInit, OnDestroy {
  private _nomJoueur: string;
  private _nbMotsDecouverts: number;
  private _listeMots: Mot[];
  private _barreProgression: HTMLElement;
  private _timer: number;
  private _formatedTimer: string;
  private _difficulte: string;

  private _timerObservable$: Observable<number>;

  private _subscriptionNbMotsDecouv: Subscription;
  private _subscriptionListeMots: Subscription;
  private _subscriptionTimer: Subscription;

  public constructor(private _servicePointage: InfojoueurService,
                     private _requeteGrille: RequeteDeGrilleService, private httpReq: HttpeReqService) {
    this._nomJoueur = "Nom du joueur";
    this._nbMotsDecouverts = 0;
    this._listeMots = [];
    this._timer = 0;
    this._timerObservable$ = TimerObservable.create(0, CONST.UNE_SECONDE_EN_MILISECONDES);
    this._difficulte = this.httpReq.difficulte.toString();
   }

  public ngOnInit(): void {
    this.initialiserSouscriptions();
    this._barreProgression = document.getElementById("progress-bar");
  }

  public formatterTimer(): void {
    let tmpTimer: number = this._timer, heures: number = 0, min: number = 0, sec: number = 0;

    heures = Math.floor(tmpTimer / CONST.SECONDES_PAR_HEURE) % CONST.HEURES_PAR_JOUR;
    tmpTimer -= heures;
    min = Math.floor(tmpTimer / CONST.SECONDES_PAR_MINUTE) % CONST.SECONDES_PAR_MINUTE;
    tmpTimer -= min;
    sec = tmpTimer % CONST.SECONDES_PAR_MINUTE;

    this._formatedTimer = String(heures) + CONST.ABREVIATION_HEURES +
                          String(min) + CONST.ABREVIATION_MINUTES +
                          String(sec) + CONST.ABREVIATION_SECONDES;
  }

  public ngOnDestroy(): void {
    this.desinscrireSouscriptions();
  }

  private initialiserSouscriptions(): void {
    this.souscrireListeDeMots();
    this.souscrireMotsDecouverts();
    this.souscrireTimer();
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

  private souscrireTimer(): void {
    this._subscriptionTimer = this._timerObservable$
      .subscribe((t: number) => {
        this._timer = t; this.formatterTimer();
      });
  }

  private desinscrireSouscriptions(): void {
    this._subscriptionListeMots.unsubscribe();
    this._subscriptionNbMotsDecouv.unsubscribe();
    this._subscriptionTimer.unsubscribe();
  }

  public get pourcentagePoint(): number {
    if (this._listeMots.length === 0) {
      return 0;
    } else {
        return Math.round(this._nbMotsDecouverts / this._listeMots.length * CONST.CONVERSION_POURCENTAGE);
    }
  }

  public majBarreProgression(): void {
    this._barreProgression.style.width = String(this.pourcentagePoint) + "%";
  }
}
