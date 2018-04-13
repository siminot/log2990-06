import { OnInit } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

export abstract class AbstractListePisteComponent implements OnInit {

    protected pistes: PisteBD[];

    public constructor(protected gestionnaireBD: GestionnaireBDCourse) {}

    public ngOnInit(): void {
        this.obtenirPistes();
    }

    public obtenirPistes(): void {
        this.gestionnaireBD.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => this.pistes = pistes);
    }
}
