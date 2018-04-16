import { Component, OnInit, OnDestroy } from "@angular/core";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { PisteBD } from "../piste/IPisteBD";
import { Subscription } from "rxjs/Subscription";
import { ITempsBD } from "../piste/ITempsBD";
import { GestionnaireDesTempsService } from "../GestionnaireDesTemps/gestionnaire-des-temps.service";
import { TempsAffichage } from "../vue-tete-haute/vue-tete-haute/tempsAffichage";

@Component({
    selector: "app-tableau-meilleurs-temps",
    templateUrl: "./tableau-meilleurs-temps.component.html",
    styleUrls: ["./tableau-meilleurs-temps.component.css"]
})
export class TableauMeilleursTempsComponent implements OnInit, OnDestroy {
    private joueurAAjouteAuTableau: boolean;
    private pisteCourante: PisteBD;
    private _placeMeriteeAuTableau: boolean;
    private tempsJoueurTableau: ITempsBD;
    private nomJoueur: string;

    public constructor(private gestionnaireBD: GestionnaireBDCourse,
                       private gestionnaireTemps: GestionnaireDesTempsService) {
        this.nomJoueur = "";
        this.joueurAAjouteAuTableau = false;
        this.pisteCourante = this.gestionnaireBD.pisteJeu;
        this.obtenirTempsPourTableau();

        // À ajuster lorsque la connexion avec le service de temps sera établie.
        this._placeMeriteeAuTableau = true;
    }

    private obtenirTempsPourTableau(): void {
        const tempsJoueur: TempsAffichage = this.gestionnaireTemps.tempsJoueur.tempsCourse;
        // GÉNÉRATION D'UN TEMPS RANDOM SI LA COURSE N'EST PAS TERMINÉ.
        if (tempsJoueur.minutes === "--") {
            tempsJoueur.minutes = "1";
            tempsJoueur.secondes = "22";
            tempsJoueur.millisecondes = "98";
        }

        this.tempsJoueurTableau = {
            nom: "",
            min: Number(tempsJoueur.minutes),
            sec: Number(tempsJoueur.secondes),
            milliSec: +tempsJoueur.millisecondes
        };
    }

    public placeMeriteeAuTableau(): boolean {
        return this._placeMeriteeAuTableau;
    }

    public ngOnInit(): void {
    }

    public peutEcrire(): boolean {
        return !this.joueurAAjouteAuTableau;
    }

    public peutSoumettre(): boolean {
        return this.nomJoueur.length !== 0 && !this.joueurAAjouteAuTableau;
    }

    public soumissionNom(): void {
        this.tempsJoueurTableau.nom = this.nomJoueur;
        this.pisteCourante.temps.push(this.tempsJoueurTableau);
        this.joueurAAjouteAuTableau = true;
        this.nomJoueur = "MERCI & BRAVO";
        this.gestionnaireBD.mettreAJourPiste(this.pisteCourante);
    }

    public ngOnDestroy(): void {
    }

}
