import { Component, OnInit, OnDestroy } from "@angular/core";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { PisteBD } from "../piste/IPisteBD";
import { Subscription } from "rxjs/Subscription";
import { ITempsBD } from "../piste/ITempsBD";

@Component({
    selector: "app-tableau-meilleurs-temps",
    templateUrl: "./tableau-meilleurs-temps.component.html",
    styleUrls: ["./tableau-meilleurs-temps.component.css"]
})
export class TableauMeilleursTempsComponent implements OnInit, OnDestroy {
    private pistes: PisteBD[];
    private abonnementPistes: Subscription;

    public pisteCourante: PisteBD;

    private listePistes: PisteBD[] = [
        {
        _id: "1a", nom: "Une piste", description: "Une description",
        points: null, type: "Hello",
        temps: [{ nom: "Ken Block", min: 1, sec: 0, milliSec: 0 }],
        nbFoisJoue: 0
        },
        {
        _id: "2a", nom: "Une deuxieme piste", description: "Une deuxiemem description",
        points: null, type: "blabla",
        temps: [{ nom: "Ken Block the second", min: 3, sec: 0, milliSec: 0 }],
        nbFoisJoue: 0
    }];

    public placeMeriteeAuTableau: boolean;
    public tempsJoueurTableau: ITempsBD;
    private values: string;

    public nomJoueur: string;

    public constructor(private gestionnaireBD: GestionnaireBDCourse) {
        // À ajuster lorsque la connexion avec le service de temps sera établie.
        this.placeMeriteeAuTableau = true;

        this.generationTempsRandomPourTest();

        this.values = "";
        this.nomJoueur = "";
    }

    public generationTempsRandomPourTest(): void {
        this.tempsJoueurTableau = { nom: "Random Name",
                                    min: 4,
                                    sec: 10,
                                    milliSec: 25 };
    }

    public ngOnInit(): void {
        this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => this.pistes = pistes);


        // Pourra être supprimé une fois que la classe recevra un temps de course.
        if (this.gestionnaireBD.pisteJeu === null) {
            this.gestionnaireBD.pisteJeu = this.listePistes[0];
        }

        this.pisteCourante = this.gestionnaireBD.pisteJeu;
    }

    public peutSoumettre(value: string): boolean {
        return this.nomJoueur.length !== 0;
    }

    public soumissionNom(): void {
        
        console.log(this.nomJoueur);
    }

    public ngOnDestroy(): void {
        this.abonnementPistes.unsubscribe();
    }

}
