import { Component, Inject } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { AbstractListePisteComponent } from "../abstract-component/abstract.listePiste.component";
import { ITempsBD } from "../piste/ITempsBD";
import { IndiceInvalideErreur } from "../../exceptions/indiceInvalide";

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
        this.miseAZeroDuTemps();
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
            delete this.pistes[this.getIndicePiste(piste)];
        }
        this.obtenirPistes();
    }

    public effacerTemps(temps: ITempsBD, piste: PisteBD): void {
        const indicePiste: number = this.getIndicePiste(piste);
        const indiceTemps: number = this.pistes[this.getIndicePiste(piste)].temps.indexOf(temps);
        this.pistes[indicePiste].temps.splice(indiceTemps, 1);
        this.gestionnaireBD.mettreAJourPiste(this.pistes[this.getIndicePiste(piste)]);
    }

    public peutAjouter(): boolean {
        return this._min !== null && this._sec !== null && this._milliSec !== null && this._nom !== "";
    }

    public ajoutTemps(piste: PisteBD): void {
        const indicePiste: number = this.getIndicePiste(piste);
        const nouveauTemps: ITempsBD = this.creerTempsBD();
        this.pistes[indicePiste].temps.push(nouveauTemps);
        this.gestionnaireBD.mettreAJourPiste(this.pistes[indicePiste]);
        this.miseAZeroDuTemps();
    }

    private creerTempsBD(): ITempsBD {
        return { nom: this._nom, min: this._min, sec: this._sec, milliSec: this._milliSec };
    }

    private getIndicePiste(piste: PisteBD): number {
        const indice: number = this.pistes.indexOf(piste);
        if (indice >= -1) {
            return indice;
        } else {
            throw new IndiceInvalideErreur();
        }
    }

    private miseAZeroDuTemps(): void {
        this._min = null;
        this._sec = null;
        this._milliSec = null;
        this._nom = "";
    }
}
