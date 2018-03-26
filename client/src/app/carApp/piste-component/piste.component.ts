import { Component, Inject } from "@angular/core";
import { AbstractGameComponent } from "../abstract-component/abstract.game.component";
import { ServiceDeRenduPistes } from "../serviceDeRendu/serviceDeRenduPistes";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { Subscription } from "rxjs/Subscription";

@Component({
    moduleId: module.id,
    selector: "app-piste-component",
    templateUrl: "./piste.component.html",
    styleUrls: ["./piste.component.css"]
})

export class PisteComponent extends AbstractGameComponent {
    public nombreDePoints: number;
    public souscriptionNbPoints: Subscription;
    public estBoucle: boolean;
    public souscriptionEstBoucle: Subscription;
    public respectContraintePiste: boolean;
    public souscriptionContraintePiste: Subscription;

    public nom: string;
    public description: string;
    public estNouvellePiste: boolean;

    public get champsSontRemplis(): boolean {
        return this.nom.length > 0 && this.description.length > 0;
    }

    public peutEnregistrer(): boolean {
        return this.estBoucle && this.respectContraintePiste && this.champsSontRemplis;
    }

    public constructor(private editeurPiste: GestionnaireEditionPiste,
                       @Inject(ServiceDeRenduPistes) serviceDeRendu: ServiceDeRenduPistes,
                       @Inject(GestionnaireClavier) gestionnaireClavier: GestionnaireClavier,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       @Inject(GestionnaireBDCourse) gestionnaireBD: GestionnaireBDCourse) {
        super(serviceDeRendu, gestionnaireClavier, gestionnaireEcran, gestionnaireSouris);
        if (gestionnaireBD.pisteEdition !== null) {
            this.estNouvellePiste = false;
            this.nom = gestionnaireBD.pisteEdition.nom;
            this.description = gestionnaireBD.pisteEdition.description;
        } else {
            this.estNouvellePiste = true;
            this.nom = "";
            this.description = "";
        }

        this.editeurPiste.importerPiste();
        this.souscrireNombrePoints();
        this.souscrireEstBoucle();
        this.souscrireRespectContraintePiste();
    }

    public creerNouvellePiste(): void {
        this.editeurPiste.creerNouvellePiste(this.nom, this.description);
    }

    public mettreAJourPiste(): void {
        this.editeurPiste.mettreAJourPiste(this.nom, this.description);
    }

    private souscrireNombrePoints(): void {
    this.souscriptionNbPoints = this.editeurPiste.piste.receptionNbPoints()
        .subscribe((nbPoints: number) => {
            this.nombreDePoints = nbPoints;
            });
    }

    private souscrireEstBoucle(): void {
    this.souscriptionEstBoucle = this.editeurPiste.piste.receptionEstBoucle()
        .subscribe((estBoucle: boolean) => {
            this.estBoucle = estBoucle;
        });
    }

    private souscrireRespectContraintePiste(): void {
    this.souscriptionContraintePiste = this.editeurPiste.piste.receptionContraintePiste()
        .subscribe((respect: boolean) => {
            this.respectContraintePiste = respect;
        });
    }
}
