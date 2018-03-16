import { Component, OnInit } from "@angular/core";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { ServiceSocketService } from "../service-socket/service-socket.service";
import { Difficulte } from "../../../../../common/communication/IConfigurationPartie";

export const REQUETE_INIT: string = "http://localhost:3000/grille/";

@Component({
    selector: "app-config-partie",
    templateUrl: "./config-partie.component.html",
    styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

    // private estCreateurPartie: boolean;
    private difficultee: string;
    private listePartie: string[];

    public constructor(private serviceHTTP: HttpeReqService, private serviceSocket: ServiceSocketService) {
        this.listePartie = [
            "Salle_1", // TEST
            "Salle_2",
            "Salle_3"
        ];
    }

    public ngOnInit(): void { }

    public apparaitreSection(laSection: string): void {
        document.getElementById(laSection).classList.remove("pasVisible");
        document.getElementById(laSection).classList.add("visible");
    }

    public disparaitreSection(laSection: string): void {
        document.getElementById(laSection).classList.remove("visible");
        document.getElementById(laSection).classList.add("pasVisible");
    }

    public ajouterDifficulte(difficulte: Difficulte): void {
        this.difficultee = difficulte;
        this.serviceSocket.modifierDifficultee(difficulte);
        if (difficulte !== undefined) {
            this.serviceHTTP.difficulte = difficulte;
        }
    }


    public creerPartie(): void {
        this.serviceSocket.creerPartie();
        // this.serviceSocket.creerPartie();
    }

    public demmanderListe(): void {
        this.serviceSocket.rejoindrePartie();
    }

    public enterKeyPress(touche: KeyboardEvent, section: string): void {
        if (touche.key === "Enter") {
            // Encore une fois ici, tslint dit que value existe pas.. pourtant
            // c'est une propriété angular
            this.serviceSocket.modifierNom(touche.target.value);
            this.apparaitreSection(section);
            this.disparaitreSection("inputNomPartie");
        }
    }

}
