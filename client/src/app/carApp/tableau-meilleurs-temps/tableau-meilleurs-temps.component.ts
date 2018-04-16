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
    private pistes: PisteBD[];
    private abonnementPistes: Subscription;
    public pisteCourante: PisteBD;
    public placeMeriteeAuTableau: boolean;
    private joueurAjouteAuTableau: boolean;

    public nomJoueur: string;

    public constructor(private gestionnaireBD: GestionnaireBDCourse,
                       private gestionnaireTemps: GestionnaireDesTempsService) {
        this.nomJoueur = "";
        this.joueurAjouteAuTableau = false;
        this.pisteCourante = this.gestionnaireBD.pisteJeu;

        // À ajuster lorsque la connexion avec le service de temps sera établie.
        this.placeMeriteeAuTableau = true;
    }

    public ngOnInit(): void {
        this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => this.pistes = pistes);
    }

    public peutEcrire(): boolean {
        return !this.joueurAjouteAuTableau;
    }

    public peutSoumettre(): boolean {
        return this.nomJoueur.length !== 0 && !this.joueurAjouteAuTableau;
    }

    public soumissionNom(): void {
        const tempsJoueur: TempsAffichage = this.gestionnaireTemps.tempsJoueur.tempsCourse;
        // GÉNÉRATION D'UN TEMPS RANDOM SI LA COURSE N'EST PAS TERMINÉ.
        if (tempsJoueur.minutes === "--") {
            tempsJoueur.minutes = "1";
            tempsJoueur.secondes = "22";
            tempsJoueur.millisecondes = "98";
        }

        const tempsAAjouter: ITempsBD = {
            nom: this.nomJoueur,
            min: Number(tempsJoueur.minutes),
            sec: Number(tempsJoueur.secondes),
            milliSec: +tempsJoueur.millisecondes
        };
        this.pisteCourante.temps.push(tempsAAjouter);

        this.joueurAjouteAuTableau = true;
        this.nomJoueur = "MERCI & BRAVO";

        this.gestionnaireBD.mettreAJourPiste(this.pisteCourante);
    }

    public ngOnDestroy(): void {
        this.abonnementPistes.unsubscribe();
    }

}
