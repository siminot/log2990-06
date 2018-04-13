import { TempsAffichage} from "../vue-tete-haute/vue-tete-haute/tempsAffichage";

export class ResultatJoueur {

    public rang: number;

    public constructor( public nom: string,
                        public joueurEstHumain: boolean,
                        public tempsDesTours: TempsAffichage[],
                        public tempsCourse: TempsAffichage) {
        this.rang = null;
    }
}
