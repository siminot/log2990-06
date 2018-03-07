import { IFonctionPeripherique } from "./IFonctionPeripherique";
import { IEvenement } from "./IEvenement";

export abstract class ConteneurFonctions {

    protected conteneur: Object;
    protected evenement: IEvenement;

    public obtenirFonctions(evenement: IEvenement): Function[] {
        this.evenement = evenement;

        return this.trouverFonctions();
    }

    protected abstract trouverFonctions(): Function[];

    public ajouter(fonctionPeripherique: IFonctionPeripherique): void {
        this.obtenirFonctions(fonctionPeripherique.evenement).push(fonctionPeripherique.fonction);
    }

    public retirer(fonctionPeripherique: IFonctionPeripherique): void {
        this.obtenirFonctions(fonctionPeripherique.evenement).forEach( (fonction: Function, index: number) => {
            if (fonction.toString() === fonctionPeripherique.fonction.toString()) {
                this.obtenirFonctions(fonctionPeripherique.evenement).splice(index, 1);
            }
        });
    }
}
