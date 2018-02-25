import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";

@Component({
  selector: "app-info-joueur1",
  templateUrl: "./info-joueur1.component.html",
  styleUrls: ["./info-joueur1.component.css"]
})
export class InfoJoueur1Component implements OnInit, OnDestroy {
  private _pointage: number;
  private _subscriptionPointage: Subscription;

  public constructor(private _servicePointage: InfojoueurService) {
    this._pointage = 0;
   }

  public ngOnInit(): void {
    this._subscriptionPointage = this._servicePointage.serviceReceptionPointage()
      .subscribe((pointage) => {
        this._pointage = pointage;
        console.log(this._pointage);
      })
  }

  public ngOnDestroy(): void {
    this._subscriptionPointage.unsubscribe();
  }
}
