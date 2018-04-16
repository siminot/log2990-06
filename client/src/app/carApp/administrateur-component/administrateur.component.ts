import { Component, Inject } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { AbstractListePisteComponent } from "../abstract-component/abstract.listePiste.component";
import { ITempsBD } from "../piste/ITempsBD";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent extends AbstractListePisteComponent {

    private _min: number;
    private _sec: number;
    private _milliSec: number;
    private _nom: string;

    public constructor(@Inject(GestionnaireBDCourse) gestionnaireBD: GestionnaireBDCourse) {
        super(gestionnaireBD);
        this._min = null;
        this._sec = null;
        this._milliSec = null;
        this._nom = "";
    }

    public editerPiste(piste: PisteBD): void {
        this.gestionnaireBD.pisteEdition = piste;
        this.gestionnaireBD.obtenirPistes();
    }

    public async supprimerPiste(piste: PisteBD): Promise<void> {
        await this.gestionnaireBD.supprimerPiste(piste);
        delete this.pistes[this.pistes.indexOf(piste)];
        this.obtenirPistes();
    }

    public creerNouvellePiste(): void {
        this.gestionnaireBD.pisteEdition = null;
    }

    public async supprimerToutesPistes(): Promise<void> {
        for (const piste of this.pistes) {
            await this.gestionnaireBD.supprimerPiste(piste);
            delete this.pistes[this.pistes.indexOf(piste)];
        }
        this.obtenirPistes();
    }

    public effacerTemps(temps: ITempsBD, piste: PisteBD): void {
        const indicePiste: number = this.pistes.indexOf(piste);
        const indiceTemps: number = this.pistes[this.pistes.indexOf(piste)].temps.indexOf(temps);
        this.pistes[indicePiste].temps.splice(indiceTemps, 1);
        this.gestionnaireBD.mettreAJourPiste(this.pistes[this.pistes.indexOf(piste)]);
    }
}
