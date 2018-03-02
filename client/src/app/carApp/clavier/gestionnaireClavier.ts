import { Injectable } from "@angular/core";
import { EvenementClavier, TypeEvenementClavier, FonctionTouche } from "./evenementClavier";

export const CHANGER_VUE: string = "v";
export const CHANGER_DECOR: string = "t";
export const CHANGER_HEURE_JOURNEE: string = "y";

@Injectable()
export class GestionnaireClavier {

    private listeRappel: Map<TypeEvenementClavier, Map<string, Array<Function>>>;
    private evenementClavier: EvenementClavier;

    public constructor() {
        this.listeRappel = new Map<TypeEvenementClavier, Map<string, Array<Function>>>();
        this.evenementClavier = null;
    }

    public toucheAppuyee(evenement: KeyboardEvent): void {
        this.evenementClavier = new EvenementClavier(evenement.key, TypeEvenementClavier.TOUCHE_APPUYEE);
        this.notifier();
    }

    public toucheRelevee(evenement: KeyboardEvent): void {
        this.evenementClavier = new EvenementClavier(evenement.key, TypeEvenementClavier.TOUCHE_RELEVEE);
        this.notifier();
    }

    public inscrire(evenement: FonctionTouche): void {
        this.evenementClavier = evenement.evenementClavier;
        this.listeInscrits.push(evenement.fonction);
    }

    public desinscrire(evenement: FonctionTouche): void {
        this.evenementClavier = evenement.evenementClavier;

        this.listeInscrits.forEach( (item, index) => {
            if (item.toString() === evenement.fonction.toString()) {
                this.listeInscrits.splice(index, 1);
            }
        });
    }

    private get listeInscrits(): Array<Function> {
        if (this.listeSelonType.get(this.evenementClavier.touche) === undefined) {
            this.listeSelonType.set(this.evenementClavier.touche, new Array<Function>());
        }

        return this.listeSelonType.get(this.evenementClavier.touche);
    }

    private get listeSelonType(): Map<string, Array<Function>> {
        if (this.listeRappel.get(this.evenementClavier.type) === undefined) {
            this.listeRappel.set(this.evenementClavier.type, new Map<string, Array<Function>>());
        }

        return this.listeRappel.get(this.evenementClavier.type);
    }

    private notifier(): void {
        for (const fonction of this.listeInscrits) {
            fonction();
    }

                       /*
    public toucheAppuyee(evenement: KeyboardEvent): void {
        switch (evenement.key) {
            case ACCELERATEUR:
                this.gestionnaireVoitures.voitureJoueur.accelerer();
                break;
            case DIRECTION_GAUCHE:
                this.gestionnaireVoitures.voitureJoueur.virerGauche();
                break;
            case DIRECTION_DROITE:
                this.gestionnaireVoitures.voitureJoueur.virerDroite();
                break;
            case FREIN:
                this.gestionnaireVoitures.voitureJoueur.freiner();
                break;
            case ZOOM_IN:
                this.gestionnaireCamera.zoomer();
                break;
            case ZOOM_OUT:
                this.gestionnaireCamera.dezoomer();
                break;
            default:
                break;
        }
    }

    public toucheRelevee(evenement: KeyboardEvent): void {
        switch (evenement.key) {
            case ACCELERATEUR:
                this.gestionnaireVoitures.voitureJoueur.relacherAccelerateur();
                break;
            case DIRECTION_GAUCHE:
            case DIRECTION_DROITE:
                this.gestionnaireVoitures.voitureJoueur.relacherVolant();
                break;
            case FREIN:
                this.gestionnaireVoitures.voitureJoueur.relacherFreins();
                break;
            case CHANGER_VUE:
                this.gestionnaireCamera.changerCamera();
                break;
            case CHANGER_DECOR:
                this.gestionnaireScene.changerDecor();
                break;
            case CHANGER_HEURE_JOURNEE:
                this.gestionnaireScene.changerTempsJournee();
                break;
            default:
                break;
        }
    }*/
    }
}
