import { Injectable, Inject } from "@angular/core";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { EvenementSouris, TypeEvenementSouris, BoutonSouris } from "../souris/evenementSouris";
import { GestionnaireCameraPiste } from "./gestionnaireCameraPiste";
import { TransformateurCoordonnees } from "./elementsGeometrie/TransformateurCoordonnees";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { Piste } from "./piste";
import { Group } from "three";

@Injectable()
export class GestionnairePiste {

    private souris: UtilisateurPeripherique;
    private transformateur: TransformateurCoordonnees;
    private _piste: Piste;

    public get piste(): Group {
        return this._piste;
    }

    public constructor(@Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran) {
        this._piste = new Piste();
        this.souris = new UtilisateurPeripherique(gestionnaireSouris);
        this.transformateur = new TransformateurCoordonnees(gestionnaireCamera, gestionnaireEcran);
        this.inscriptionSouris();
    }

    private inscriptionSouris(): void {
        // this.souris.ajouter(this.miseAJourPoint.bind(this), new EvenementSouris(TypeEvenementSouris.DRAG));
        this.souris.ajouter(this.ajouterPoint.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
        this.souris.ajouter(this.effacerPoint.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
    }

    private miseAJourPoint(evenementSouris: MouseEvent): void {
        if (this.transformateur.estSurScene(evenementSouris)) {
            this._piste.miseAJourElementCourant(this.transformateur.positionEcranVersScene(evenementSouris));
        }
    }

    private ajouterPoint(evenementSouris: MouseEvent): void {
        if (this.transformateur.estSurScene(evenementSouris) && evenementSouris.button === BoutonSouris.GAUCHE) {
            this._piste.ajouterPoint(this.transformateur.positionEcranVersScene(evenementSouris));
        }
    }

    private effacerPoint(evenementSouris: MouseEvent): void {
        if (this.transformateur.estSurScene(evenementSouris) && evenementSouris.button === BoutonSouris.DROIT) {
            this._piste.effacerPoint(this.transformateur.positionEcranVersScene(evenementSouris));
        }
    }
}
