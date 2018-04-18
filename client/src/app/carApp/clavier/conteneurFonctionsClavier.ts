import { ConteneurFonctions } from "../peripheriques/ConteneurFonctions";
import { EvenementClavier, TypeEvenementClavier, FonctionTouche } from "./evenementClavier";

export class ConteneurFonctionsClavier extends ConteneurFonctions {

    protected conteneur: Map<TypeEvenementClavier, Map<string, Function[]>>;
    protected evenement: EvenementClavier;

    public constructor() {
        super();
        this.conteneur = new Map<TypeEvenementClavier, Map<string, Function[]>>();
        this.evenement = null;
    }

    // Redefinition pour seulement prendre les Evenements associes au clavier
    public obtenirFonctions(evenement: EvenementClavier): Function[] {
        return super.obtenirFonctions(evenement);
    }

    public ajouter(fonctionPeripherique: FonctionTouche ): void {
        super.ajouter(fonctionPeripherique);
    }

    public retirer(fonctionPeripherique: FonctionTouche): void {
        super.retirer(fonctionPeripherique);
    }

    protected trouverFonctions(): Function[] {
        return this.obtenirListeSelonTouche(this.obtenirListeSelonTypeEvenement());
    }

    private obtenirListeSelonTypeEvenement(): Map<string, Function[]> {
        if (this.conteneur.get(this.evenement.type) === undefined) {
            this.conteneur.set(this.evenement.type, new Map<string, Function[]>());
        }

        return this.conteneur.get(this.evenement.type);
    }

    private obtenirListeSelonTouche(secondeMap: Map<string, Function[]>): Function[] {
        if (secondeMap.get(this.evenement.touche) === undefined) {
            secondeMap.set(this.evenement.touche, new Array<Function>());
        }

        return secondeMap.get(this.evenement.touche);
    }
}
