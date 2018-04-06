import { Component, OnInit } from "@angular/core";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { PisteBD } from "../piste/IPisteBD";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-resultats-fin-course",
  templateUrl: "./resultats-fin-course.component.html",
  styleUrls: ["./resultats-fin-course.component.css"]
})

export class ResultatsFinCourseComponent implements OnInit {
  public pistes: PisteBD[];
  public abonnementPistes: Subscription;

  public pisteCourante: PisteBD;
  public abonnementPisteCourante: Subscription;

  public constructor(private gestionnaireBD: GestionnaireBDCourse) {

  }

  public ngOnInit(): void {
    this.abonnementPistesBD();
    this.abonnementPisteCouranteBD();
  }

  private abonnementPistesBD(): void {
    this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
        .subscribe((pistes: PisteBD[]) => { this.pistes = pistes; this.abonnementPisteCouranteBD(); });
  }

  private abonnementPisteCouranteBD(): void {
    console.log(this.pistes);
    if (this.gestionnaireBD.pisteJeu === null) {
        console.log("Assignation d'une piste de jeu au gestionnaire BD.");
        this.gestionnaireBD.pisteJeu = this.pistes[0];
    }
    this.abonnementPisteCourante = this.gestionnaireBD.obtenirUnePiste(this.gestionnaireBD.pisteJeu._id)
        .subscribe((piste: PisteBD) => { this.pisteCourante = piste; console.log(this.pisteCourante); });
  }
}
