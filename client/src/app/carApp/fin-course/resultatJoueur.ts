import { TempsAffichage} from "../vue-tete-haute/vue-tete-haute/tempsAffichage";
import { TempsJoueur } from "../GestionnaireDesTemps/tempsJoueur";

export class ResultatJoueur {

    public position: number;
    public nom: string;
    public tempsCourse: TempsAffichage;
    public tempsTours: Array<TempsAffichage>;

    public constructor(nom: string, tempsJoueur: TempsJoueur) {
        this.position = null;
        this.nom = nom;
        this.tempsCourse = tempsJoueur.tempsCourse;
        this.tempsTours = tempsJoueur.tempsTours;
    }
}
