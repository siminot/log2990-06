import { AfterViewInit, Component, ElementRef, ViewChild, HostListener } from "@angular/core";
import { ServiceDeRendu } from "../serviceDeRendu/serviceDeRendu";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";

@Component({
    moduleId: module.id,
    selector: "app-game-component",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})

export class GameComponent implements AfterViewInit {

    @ViewChild("container")
    private containerRef: ElementRef;

    public constructor(private serviceDeRendu: ServiceDeRendu,
                       private gestionnaireCamera: GestionnaireCamera,
                       private gestionnaireVoitures: GestionnaireVoitures,
                       private gestionnaireScene: GestionnaireScene,
                       private gestionnaireClavier: GestionnaireClavier,
                       private gestionnaireEcran: GestionnaireEcran) { }

    public ngAfterViewInit(): void {
        this.gestionnaireEcran.initialiserConteneur(this.containerRef.nativeElement);
        this.serviceDeRendu
            .initialiser()
            .then(/* do nothing */)
            .catch((err) => console.error(err));
    }

    // Gestion des évènements

    @HostListener("window:resize", ["$event"])
    public redimensionnement(): void {
        this.gestionnaireEcran.redimensionnement();
    }

    @HostListener("window:keydown", ["$event"])
    public toucheAppuyee(evenement: KeyboardEvent): void {
        this.gestionnaireClavier.toucheAppuyee(evenement);
    }

    @HostListener("window:keyup", ["$event"])
    public toucheRelevee(evenement: KeyboardEvent): void {
        this.gestionnaireClavier.toucheRelevee(evenement);
    }
}
