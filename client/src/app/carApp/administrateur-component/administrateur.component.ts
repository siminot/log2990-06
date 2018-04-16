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

    public constructor(@Inject(GestionnaireBDCourse) gestionnaireBD: GestionnaireBDCourse) {
        super(gestionnaireBD);
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
        console.log("Indice de la piste : " + this.pistes.indexOf(piste));
        console.log("Indice du temps : " + this.pistes[this.pistes.indexOf(piste)].temps.indexOf(temps));
        console.log("Liste des temps de la piste : ");
        console.log(this.pistes[this.pistes.indexOf(piste)].temps);
        console.log("Temps à supprimer : ");
        console.log(this.pistes[this.pistes.indexOf(piste)].temps[this.pistes[this.pistes.indexOf(piste)].temps.indexOf(temps)]);
        this.pistes[this.pistes.indexOf(piste)].temps.splice(this.pistes[this.pistes.indexOf(piste)].temps.indexOf(temps), 1);
        console.log("Liste des temps de la piste : ");
        console.log(this.pistes[this.pistes.indexOf(piste)].temps);
        this.gestionnaireBD.mettreAJourPiste(this.pistes[this.pistes.indexOf(piste)]);
        this.obtenirPistes();
    }
}
