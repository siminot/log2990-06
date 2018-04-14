import { Component, OnInit, OnDestroy } from "@angular/core";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { PisteBD } from "../piste/IPisteBD";
import { Subscription } from "rxjs/Subscription";
import { MatTableDataSource } from "@angular/material";

@Component({
    selector: "app-tableau-meilleurs-temps",
    templateUrl: "./tableau-meilleurs-temps.component.html",
    styleUrls: ["./tableau-meilleurs-temps.component.css"]
})
export class TableauMeilleursTempsComponent implements OnInit, OnDestroy {
    private pistes: PisteBD[];
    private abonnementPistes: Subscription;

    public pisteCourante: PisteBD;

    private listePistes: PisteBD[] = [{
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

    private colonnesAffichees: string[];

    public constructor(private gestionnaireBD: GestionnaireBDCourse) {
    }

    public ngOnInit(): void {
        this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => this.pistes = pistes);

        if (this.gestionnaireBD.pisteJeu === null) {
            this.gestionnaireBD.pisteJeu = this.listePistes[0];
        }

        this.pisteCourante = this.gestionnaireBD.pisteJeu;
    }

    public ngOnDestroy(): void {
        this.abonnementPistes.unsubscribe();
    }

}
