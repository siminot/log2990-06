import { OnInit, OnDestroy } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { Subscription } from "rxjs/Subscription";

export abstract class AbstractListePisteComponent implements OnInit, OnDestroy {

    protected pistes: PisteBD[];
    private abonnementPistes: Subscription;

    public constructor(protected gestionnaireBD: GestionnaireBDCourse) {}

    public ngOnInit(): void {
        this.obtenirPistes();
    }

    public obtenirPistes(): void {
        this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => this.pistes = pistes);
    }

    public desinscriptionAuxPistes(): void {
        this.abonnementPistes.unsubscribe();
    }

    public ngOnDestroy(): void {
        this.desinscriptionAuxPistes();
    }
}
