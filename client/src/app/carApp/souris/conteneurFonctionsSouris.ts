import { ConteneurFonctions } from "../peripheriques/ConteneurFonctions";
import { TypeEvenementSouris, EvenementSouris } from "./evenementSouris";

export class ConteneurFonctionSouris extends ConteneurFonctions {

    protected conteneur: Map<TypeEvenementSouris, Function[]>;
    protected evenement: EvenementSouris;

    public constructor() {
        super();
        this.conteneur = new Map<TypeEvenementSouris, Function[]>();
        this.evenement = null;
    }

    protected trouverFonctions(): Function[] {
        if (this.conteneur.get(this.evenement.type) === undefined) {
            this.conteneur.set(this.evenement.type, new Array<Function>());
        }

        return this.conteneur.get(this.evenement.type);
    }
}
