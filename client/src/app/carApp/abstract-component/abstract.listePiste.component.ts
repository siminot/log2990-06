import { OnInit, OnDestroy } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { Subscription } from "rxjs/Subscription";
import { ITempsBD } from "../piste/ITempsBD";
import * as CONST from "../constants";

export abstract class AbstractListePisteComponent implements OnInit, OnDestroy {

    protected pistes: PisteBD[];
    private abonnementPistes: Subscription;

    public constructor(protected gestionnaireBD: GestionnaireBDCourse) {}

    public ngOnInit(): void {
        this.obtenirPistes();
    }

    public obtenirPistes(): void {
        this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => {
                this.pistes = pistes;
                this.classerTemps();
            });
    }

    public desinscriptionAuxPistes(): void {
        this.abonnementPistes.unsubscribe();
    }

    public ngOnDestroy(): void {
        this.desinscriptionAuxPistes();
    }

    protected classerTemps(): void {
        for (const piste of this.pistes) {
            piste.temps.sort((a: ITempsBD, b: ITempsBD) => {
                const tmpA: number = a.milliSec + a.sec * CONST.SECONDS_TO_MILLISECS +
                    a.min * CONST.MIN_TO_MILLISECS;
                const tmpB: number = b.milliSec + b.sec * CONST.SECONDS_TO_MILLISECS +
                    b.min * CONST.MIN_TO_MILLISECS;

                return tmpA > tmpB ? 1 : -1;
            });
        }
    }
}
