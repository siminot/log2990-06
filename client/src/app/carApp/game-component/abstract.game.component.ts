import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from "@angular/core";
import { ServiceDeRenduAbstrait } from "../serviceDeRendu/servideDeRenduAbstrait";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";

@Component({
    moduleId: module.id,
})

export abstract class AbstractGameComponent implements AfterViewInit {

    @ViewChild("container")
    protected containerRef: ElementRef;

    protected constructor(protected serviceDeRendu: ServiceDeRenduAbstrait,
                          protected gestionnaireClavier: GestionnaireClavier,
                          protected gestionnaireEcran: GestionnaireEcran,
                          protected gestionnaireSouris: GestionnaireSouris) { }

    public ngAfterViewInit(): void {
        this.gestionnaireEcran.initialiserConteneur(this.containerRef.nativeElement);
        this.serviceDeRendu
            .initialiser()
            .then(/* do nothing */)
            .catch((err) => console.error(err));
    }

    // Gestion des évènements de l'ecran

    @HostListener("window:resize", ["$event"])
    public redimensionnement(): void {
        this.serviceDeRendu.redimensionnement();
    }

    // Gestion des évènements du clavier

    @HostListener("window:keydown", ["$event"])
    public toucheAppuyee(evenement: KeyboardEvent): void {
        this.gestionnaireClavier.toucheAppuyee(evenement);
    }

    @HostListener("window:keyup", ["$event"])
    public toucheRelevee(evenement: KeyboardEvent): void {
        this.gestionnaireClavier.toucheRelevee(evenement);
    }

    @HostListener("window:keypress", ["$event"])
    public touchePressee(evenement: KeyboardEvent): void {
        this.gestionnaireClavier.touchePressee(evenement);
    }

    // Gestion des évènements de la souris

    @HostListener("window:mousemove", ["$event"])
    public sourisDeplacement(evenement: MouseEvent): void {
        this.gestionnaireSouris.sourisDeplacement(evenement);
    }

    @HostListener("window:mouseup", ["$event"])
    public sourisDeplaceeHaut(evenement: MouseEvent): void {
        this.gestionnaireSouris.sourisDeplaceeHaut(evenement);
    }

    @HostListener("window:mousedown", ["$event"])
    public sourisDeplaceeBas(evenement: MouseEvent): void {
        this.gestionnaireSouris.sourisDeplaceeBas(evenement);
    }

    @HostListener("window:mouseover", ["$event"])
    public sourisSur(evenement: MouseEvent): void {
        this.gestionnaireSouris.sourisSur(evenement);
    }

    @HostListener("window:mouseon", ["$event"])
    public sourisDeplacementSur(evenement: MouseEvent): void {
        this.gestionnaireSouris.sourisDeplacementSur(evenement);
    }

    @HostListener("window:onclick", ["$event"])
    public sourisCliquee(evenement: MouseEvent): void {
        this.gestionnaireSouris.sourisCliquee(evenement);
    }

    @HostListener("window:ondblclick", ["$event"])
    public sourisDoubleCliquee(evenement: MouseEvent): void {
        this.gestionnaireSouris.sourisDoubleCliquee(evenement);
    }
}
