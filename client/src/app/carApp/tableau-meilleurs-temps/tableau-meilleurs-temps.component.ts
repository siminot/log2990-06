import { Component, OnInit } from "@angular/core";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { PisteBD } from "../piste/IPisteBD";
import { ITempsBD } from "../piste/ITempsBD";
import { GestionnaireDesTempsService } from "../GestionnaireDesTemps/gestionnaire-des-temps.service";
import { ErreurMettreAJourPiste } from "../../exceptions/erreurMettreAJourPiste";
import { ResultatJoueur } from "../fin-course/resultatJoueur";
import { TempsJoueur } from "../GestionnaireDesTemps/tempsJoueur";

@Component({
    selector: "app-tableau-meilleurs-temps",
    templateUrl: "./tableau-meilleurs-temps.component.html",
    styleUrls: ["./tableau-meilleurs-temps.component.css"]
})
export class TableauMeilleursTempsComponent implements OnInit {
    private _joueurASoumisAuTableau: boolean;
    private _pisteCourante: PisteBD;
    private _resultatsCourse: Array<ResultatJoueur>;
    private _tempsAAjouterAuTableau: ITempsBD;
    private _nomJoueur: string;

    public constructor(private gestionnaireBD: GestionnaireBDCourse,
                       private gestionnaireTemps: GestionnaireDesTempsService) {
        this._nomJoueur = "";
        this._joueurASoumisAuTableau = false;
        this._pisteCourante = this.gestionnaireBD.pisteJeu;
        this.classerTempsTableau();
    }

    public ngOnInit(): void {
        this._resultatsCourse = new Array<ResultatJoueur>();
        this.obtenirResultats();
        this.formatterTempsDuJoueurAAJouter();
    }

    private obtenirResultats(): void {
        const tempsJoueurs: TempsJoueur[] = this.gestionnaireTemps.obtenirTempsDesJoueurs();
        this._resultatsCourse.push(new ResultatJoueur("Joueur", tempsJoueurs[0]));
        for (let i: number = 1; i < tempsJoueurs.length; i++ ) {
            this._resultatsCourse.push(new ResultatJoueur("AI" + " " + i , tempsJoueurs[i]));
        }
        this.classerTempsCourse();
        this.ajouterPosition();
    }

    private classerTempsCourse(): void {
        this._resultatsCourse.sort((a: ResultatJoueur, b: ResultatJoueur) =>
            a.tempsCourse.temps - b.tempsCourse.temps);
    }

    private classerTempsTableau(): void {
        this._pisteCourante.temps.sort((a: ITempsBD, b: ITempsBD) => {
            const tmpA: number = a.milliSec + a.sec * 1000 + a.min * 60000;
            const tmpB: number = b.milliSec + b.sec * 1000 + b.min * 60000;

            return tmpA > tmpB ? 1 : -1;
        });
    }

    private ajouterPosition(): void {
        let position: number = 1;
        for (const resultat of this._resultatsCourse) {
            resultat.position = position;
            position++;
        }
    }

    private formatterTempsDuJoueurAAJouter(): void {
        this._tempsAAjouterAuTableau = {
            nom: null,
            min: +this._resultatsCourse[0].tempsCourse.minutes,
            sec: +this._resultatsCourse[0].tempsCourse.secondes,
            milliSec : +this._resultatsCourse[0].tempsCourse.millisecondes
        };
    }

    public placeMeriteeAuTableau(): boolean {
        return this._resultatsCourse[0].position === 1;
    }
    public peutEcrire(): boolean {
        return !this._joueurASoumisAuTableau;
    }

    public peutSoumettre(): boolean {
        return this._nomJoueur.length !== 0 && !this._joueurASoumisAuTableau;
    }

    public soumissionNom(): void {
        this._tempsAAjouterAuTableau.nom = this._nomJoueur;
        this._pisteCourante.temps.push(this._tempsAAjouterAuTableau);
        this.classerTempsTableau();
        this._joueurASoumisAuTableau = true;
        this._nomJoueur = "MERCI & BRAVO";
        this.gestionnaireBD.mettreAJourPiste(this._pisteCourante)
            .catch(() => { throw new ErreurMettreAJourPiste; });
    }
}
