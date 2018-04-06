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

  private pistes: PisteBD[];
  private abonnementPistes: Subscription;

  public constructor(private gestionnaireBD: GestionnaireBDCourse) {

  }

  public ngOnInit(): void {
    this.abonnementPistesBD();
  }

  private abonnementPistesBD(): void {
    this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
        .subscribe((pistes: PisteBD[]) => { this.pistes = pistes; });
  }

}
