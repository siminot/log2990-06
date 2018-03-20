import { Component, OnInit } from "@angular/core";
import { ServiceHttp } from "../serviceHttp/http-request.service";
import { SocketService } from "../service-socket/service-socket";
import { Difficulte } from "../../../../../common/communication/IConfigurationPartie";
import { Router } from "@angular/router";

export const REQUETE_INIT: string = "http://localhost:3000/grille/";

@Component({
    selector: "app-config-partie",
    templateUrl: "./config-partie.component.html",
    styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

    // private estCreateurPartie: boolean;
    private nomPartie: string;
    private nomJoueur: string;
    private difficultee: string;
    private listePartie: Array<Array<string>>;

    public constructor(private serviceHTTP: ServiceHttp, private serviceSocket: SocketService, private router: Router) {

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
        if (difficulte !== undefined) {
            this.serviceHTTP.difficulte = difficulte;
        }
    }


    private commencerPartie(): void {
        this.serviceSocket.chargementComplete().subscribe(() => {
            this.router.navigateByUrl("/CrosswordsGame");
        });
    }

    public creerPartie(): void {
        this.serviceSocket.creerPartie(this.nomPartie, this.difficultee, this.nomJoueur);
        this.commencerPartie();
        this.demandeEtEnvoieGrille();
    }

    public rejoindrePartie(nomPartie: string): void {
        this.serviceSocket.rejoindrePartie(nomPartie, this.nomJoueur);
    }

    public demanderListePartie(): void {
        this.serviceSocket.recevoirListePartie().subscribe( (data: Array<Array<string>>) => {
            this.listePartie = data;
            console.log(data);
            console.log("salut");
        });
    }

    public enterKeyPress(touche: KeyboardEvent, section: string): void {
        if (touche.key === "Enter") {
            // Encore une fois ici, tslint dit que value existe pas.. pourtant
            // c'est une propriété angular
            this.nomPartie = touche.target.value;
            this.apparaitreSection(section);
            this.disparaitreSection("inputNomPartie");
        }
    }

    public entrerNomJoueur(touche: KeyboardEvent, section: string): void {
        if (touche.key === "Enter") {
            this.nomJoueur = touche.target.value;
            this.apparaitreSection(section);
            this.disparaitreSection("inputNomJoueur");
        }
    }

    private demandeEtEnvoieGrille(): void {
        this.serviceSocket.demandeDeGrille().subscribe(() => {
            this.serviceHTTP.obtenirMots().subscribe( (x) => {
                this.serviceSocket.envoyerGrille(x);
            });
        });
    }


}
