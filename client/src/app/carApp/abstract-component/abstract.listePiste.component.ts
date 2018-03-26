import { AfterViewInit } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

export abstract class AbstractListePisteComponent implements AfterViewInit {

    protected pistes: PisteBD[];

    public constructor(protected gestionnaireBD: GestionnaireBDCourse) { }

    public ngAfterViewInit(): void {
      this.obtenirPistes();
    }

    protected obtenirPistes(): void {
        this.gestionnaireBD.obtenirPistes().subscribe((piste: PisteBD[]) => this.pistes = piste);
    }
}
