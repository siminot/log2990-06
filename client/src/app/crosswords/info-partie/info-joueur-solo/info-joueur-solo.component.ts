import { Component, OnInit, OnDestroy } from "@angular/core";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { HttpeReqService } from "../../httpRequest/http-request.service";
import { RequeteDeGrilleService } from "../../service-Requete-de-Grille/requete-de-grille.service";
import { InfoPartieAbs } from "../../info-partie/info-partie-abs";

@Component({
  selector: "app-info-joueur-solo",
  templateUrl: "./info-joueur-solo.component.html",
  styleUrls: ["./info-joueur-solo.component.css"]
})

export class InfoJoueurSoloComponent extends InfoPartieAbs implements OnInit, OnDestroy {

  public constructor(_servicePointage: InfojoueurService,
                     private _requeteGrille: RequeteDeGrilleService, private httpReq: HttpeReqService) {
    super(_servicePointage);
    this._difficulte = this.httpReq.difficulte.toString();
   }

  protected souscrireListeDeMots(): void {
    this._subscriptionListeMots = this._requeteGrille.serviceReceptionMots()
    .subscribe((listeMots) => {
      this._listeMots = listeMots;
    });
  }
}
