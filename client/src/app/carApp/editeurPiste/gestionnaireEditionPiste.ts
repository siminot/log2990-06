import { Injectable, Inject } from "@angular/core";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { EvenementSouris, TypeEvenementSouris, BoutonSouris } from "../souris/evenementSouris";
import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { TransformateurCoordonnees } from "../editeurPiste/transformateurCoordonnees";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { PisteEdition } from "../piste/pisteEdition";
import { Point } from "../elementsGeometrie/point";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

@Injectable()
export class GestionnaireEditionPiste {

    private souris: UtilisateurPeripherique;
    private transformateur: TransformateurCoordonnees;
    private _piste: PisteEdition;

    public get piste(): PisteEdition {
        return this._piste;
    }

    public constructor(private gestionnaireBD: GestionnaireBDCourse,
                       @Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran) {
        this._piste = new PisteEdition();
        this._piste.importer(gestionnaireBD.pointsEdition);
        this.souris = new UtilisateurPeripherique(gestionnaireSouris);
        this.transformateur = new TransformateurCoordonnees(gestionnaireCamera, gestionnaireEcran);
        this.inscriptionSouris();
    }

    public creerNouvellePiste(nom: string, description: string): void {
        this.gestionnaireBD.creerNouvellePiste({_id: null, nom: nom, description: description, points: this._piste.exporter()});
    }

    public mettreAJourPiste(nom: string, description: string): void {
        this.gestionnaireBD.mettreAJourPiste({_id: null, nom: nom, description: description, points: this._piste.exporter()});
    }

    private inscriptionSouris(): void {
        this.souris.ajouter(this.ajouterPoint.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
        this.souris.ajouter(this.effacerPoint.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
        this.souris.ajouter(this.deplacementPoint.bind(this), new EvenementSouris(TypeEvenementSouris.DRAG));
        this.souris.ajouter(this.selectionner.bind(this), new EvenementSouris(TypeEvenementSouris.MOUSEDOWN));
        this.souris.ajouter(this.deselectionner.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
    }

    private ajouterPoint(evenementSouris: MouseEvent): void {
        if (this.positionSourisValide(evenementSouris) && evenementSouris.button === BoutonSouris.GAUCHE) {
            this._piste.ajouterPoint(this.positionSouris(evenementSouris));
        }
    }

    private effacerPoint(evenementSouris: MouseEvent): void {
        if (this.positionSourisValide(evenementSouris) && evenementSouris.button === BoutonSouris.DROIT) {
            this._piste.effacerPoint();
        }
    }

    private deplacementPoint(evenementSouris: MouseEvent): void {
        if (this.positionSourisValide(evenementSouris) && evenementSouris.button === BoutonSouris.GAUCHE) {
            this._piste.miseAJourElementSelectionne(this.positionSouris(evenementSouris));
        }
    }

    private selectionner(evenementSouris: MouseEvent): void {
        if (this.positionSourisValide(evenementSouris) && evenementSouris.button === BoutonSouris.GAUCHE) {
            this._piste.selectionnerIntersection(this.positionSouris(evenementSouris));
        }
    }

    private deselectionner(evenementSouris: MouseEvent): void {
        if (this.positionSourisValide(evenementSouris) && evenementSouris.buttons === 0) {
            this._piste.deselectionnerIntersection();
        }
    }

    private positionSourisValide(evenementSouris: MouseEvent): boolean {
        return this.transformateur.estSurScene(evenementSouris);
    }

    private positionSouris(evenementSouris: MouseEvent): Point {
        return this.transformateur.positionEcranVersScene(evenementSouris);
    }
}
