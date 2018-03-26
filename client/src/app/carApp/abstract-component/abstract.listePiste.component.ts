import { AfterViewInit } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { Subscription } from "rxjs/Subscription";

export abstract class AbstractListePisteComponent implements AfterViewInit {

    protected pistes: PisteBD[];

    public abonnementPistes: Subscription;

    public constructor(protected gestionnaireBD: GestionnaireBDCourse) {
        this.pistes = gestionnaireBD.pistes;
        this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
        .subscribe((pistes: PisteBD[]) => this.pistes = pistes);
    }

    public ngAfterViewInit(): void {
      this.obtenirPistes();
    }

    protected obtenirPistes(): void {
        this.gestionnaireBD.obtenirPistes().subscribe((piste: PisteBD[]) => this.pistes = piste);
    }
}
