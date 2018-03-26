import { OnChanges, OnInit } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { Subscription } from "rxjs/Subscription";

export abstract class AbstractListePisteComponent implements OnInit, OnChanges {

    protected pistes: PisteBD[];
    protected abonnementPistes: Subscription;

    public constructor(protected gestionnaireBD: GestionnaireBDCourse) {}

    public ngOnInit(): void {
      this.pistes = this.gestionnaireBD.pistes;
      this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
          .subscribe((pistes: PisteBD[]) => this.pistes = pistes);
    }

    public ngOnChanges(): void {
    }
}
