import { Component, OnInit } from "@angular/core";
import { ServiceHttp } from "../serviceHttp/http-request.service";
import { SocketService } from "../service-socket/service-socket";
import { Difficulte } from "../../../../../common/communication/Difficulte";
import { Router } from "@angular/router";
import { listeMotsLongue } from "./../objetsTest/objetsTest";
import { SERVER_URL } from "../../../../../common/communication/Server";

export const REQUETE_INIT: string = SERVER_URL + "grille/";
const TOUCHE_ENTREE: string = "Enter";

@Component({
    selector: "app-config-partie",
    templateUrl: "./config-partie.component.html",
    styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {
    public estCreateur: boolean;
    public listePartie: Array<Array<string>>;

    private nomPartie: string;
    private nomJoueur: string;
    private difficultee: string;

    public constructor(private serviceHTTP: ServiceHttp,
                       private serviceSocket: SocketService,
                       private router: Router) {}

    public ngOnInit(): void { }

    public apparaitreSection(laSection: string): void {
        document.getElementById(laSection).classList.remove("pasVisible");
        document.getElementById(laSection).classList.add("visible");
        if (laSection === "inputNomPartie") {
            document.getElementById("inp").focus();
        } else if (laSection === "inputNomJoueur") {
            document.getElementById("inj").focus();
        }
    }

    public disparaitreSection(laSection: string): void {
        document.getElementById(laSection).classList.remove("visible");
        document.getElementById(laSection).classList.add("pasVisible");
    }

    public ajouterDifficulte(difficulte: string): void {
        this.difficultee = difficulte;
        if (difficulte !== undefined) {
            this.serviceHTTP.difficulte = difficulte as Difficulte;
        }
    }

    private commencerPartie(): void {
        this.serviceSocket.chargementComplete().subscribe(() => {
            this.router.navigateByUrl("CrosswordsGameMulti");
        });
    }

    public creerPartie(): void {
        this.serviceSocket.creerPartie(this.nomPartie, this.difficultee, this.nomJoueur);
        this.commencerPartie();
        this.demandeEtEnvoieGrille();
    }

    public rejoindrePartie(): void {
        this.serviceSocket.rejoindrePartie(this.nomPartie, this.nomJoueur);
        this.commencerPartie();
    }

    public demanderListePartie(): void {
        this.serviceSocket.recevoirListePartie().subscribe( (data: Array<Array<string>>) => {
            this.listePartie = data;
        });
    }

    public enterKeyPress(touche: KeyboardEvent, section: string): void {
        if (touche.key === TOUCHE_ENTREE) {
            if (touche.target instanceof HTMLInputElement) {
                if (touche.target.value === "") {
                    this.modifierNomPartie("salle" + this.listePartie.length);
                } else {
                    this.modifierNomPartie(touche.target.value);
                }
            }
            this.apparaitreSection(section);
            this.disparaitreSection("inputNomPartie");
        }
    }

    public modifierNomPartie(nouveauNom: string): void {
        this.nomPartie = nouveauNom;
    }

    public entrerNomJoueur(touche: KeyboardEvent, section: string): void {
        if (touche.key === TOUCHE_ENTREE) {
            if (touche.target instanceof HTMLInputElement) {
                this.nomJoueur = touche.target.value === "" ?
                "joueur" :
                touche.target.value;
            }
            this.apparaitreSection(section);
            this.disparaitreSection("inputNomJoueur");
            if (!this.estCreateur) {
                this.rejoindrePartie();
            }
        }
    }

    private demandeEtEnvoieGrille(): void {
        this.serviceSocket.demandeDeGrille().subscribe(() => {
            this.serviceSocket.envoyerGrille(listeMotsLongue);
        });
    }
}
