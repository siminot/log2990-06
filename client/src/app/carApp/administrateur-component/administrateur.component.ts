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
        // this._min = null;
        // this._sec = null;
        // this._milliSec = null;
        // this._nom = "";
        this._min = 1;
        this._sec = 10;
        this._milliSec = 45;
        this._nom = "Seb";
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

    private getIndicePiste(piste: PisteBD): number {
        return this.pistes.indexOf(piste);
    }

    public async supprimerToutesPistes(): Promise<void> {
        for (const piste of this.pistes) {
            await this.gestionnaireBD.supprimerPiste(piste);
            delete this.pistes[this.getIndicePiste(piste)];
        }
        this.obtenirPistes();
    }

    public effacerTemps(temps: ITempsBD, piste: PisteBD): void {
        const indicePiste: number = this.getIndicePiste(piste);
        const indiceTemps: number = this.pistes[this.pistes.indexOf(piste)].temps.indexOf(temps);
        this.pistes[indicePiste].temps.splice(indiceTemps, 1);
        this.gestionnaireBD.mettreAJourPiste(this.pistes[this.pistes.indexOf(piste)]);
    }

    public peutAjouter(): boolean {
        return this._min !== null && this._sec !== null && this._milliSec !== null && this._nom !== "";
    }

    public ajoutTemps(piste: PisteBD): void {
        const indicePiste: number = this.getIndicePiste(piste);
        // if (indicePiste >= -1) {}
        console.log(piste);
        console.log(indicePiste);
        // const nouveauTemps: ITempsBD = this.creerTempsBD();
        // this.pistes[indicePiste].temps.push(nouveauTemps);
        // this.gestionnaireBD.mettreAJourPiste(this.pistes[indicePiste]);
    }

    private creerTempsBD(): ITempsBD {
        return { nom: this._nom, min: this._min, sec: this._sec, milliSec: this._milliSec };
    }
}
