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

    private estCreateurPartie: boolean;
    private listePartie: string[];

    public constructor(private serviceHTTP: HttpeReqService, private serviceSocket: ServiceSocketService) {
        this.listePartie = [
            "Salle_1", // TEST
            "Salle_2",
            "Salle_3"
        ];
    }

    public ngOnInit(): void { }

    public definirEstCreateur(estCreateur: boolean): void {
        this.estCreateurPartie = estCreateur;
    }

    public apparaitreSection(laSection: string): void {
        document.getElementById(laSection).classList.remove("pasVisible");
        document.getElementById(laSection).classList.add("visible");
    }

    public disparaitreSection(laSection: string): void {
        document.getElementById(laSection).classList.remove("visible");
        document.getElementById(laSection).classList.add("pasVisible");
    }

    public ajouterDifficulte(difficulte: Difficulte): void {
        if (difficulte !== undefined) {
            this.serviceHTTP.difficulte = difficulte;
        }
    }

    public enterKeyPress(touche: KeyboardEvent, section: string): void {
        if (touche.key === "Enter") {
            if (this.estCreateurPartie) {
                this.apparaitreSection(section);
            } else {
                //
            }
            this.disparaitreSection("inputNomPartie");
        }
    }
    public rejoindreSalle(nomSalle: string): void {
        this.serviceSocket.joueurVeutJoindre(nomSalle);
    }
}
