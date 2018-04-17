import { TempsAffichage} from "../vue-tete-haute/vue-tete-haute/tempsAffichage";

export class ResultatJoueur {

    public position: number;

    public constructor( public nom: string,
                        public joueurEstHumain: boolean,
                        public tempsDesTours: TempsAffichage[],
                        public tempsCourse: TempsAffichage) {
        this.position = null;
    }
}
