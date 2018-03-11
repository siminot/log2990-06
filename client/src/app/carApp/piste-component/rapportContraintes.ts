import { DroiteAffichage } from "./elementsGeometrie/droiteAffichage";

export class RapportContraintes {

    public longueurRespectee: boolean;
    public angleArriveeRespectee: boolean;
    public angleDebutRespectee: boolean;
    public croisementAvec: DroiteAffichage[];

    public constructor() {
        this.longueurRespectee = false;
        this.angleArriveeRespectee = false;
        this.angleDebutRespectee = false;
        this.croisementAvec = [];
    }

    public ajouterCroisement(droite: DroiteAffichage): void {
        if (this.croisementAvec.indexOf(droite) === -1) {
            this.croisementAvec.push(droite);
        }
    }

    public retirerCroisement(droite: DroiteAffichage): void {
        if (this.croisementAvec.indexOf(droite) !== -1) {
            this.croisementAvec.splice(this.croisementAvec.indexOf(droite), 1);
        }
    }

    private get aucunCroisement(): boolean {
        return this.croisementAvec.length === 0;
    }

    private get anglesRespectees(): boolean {
        return this.angleArriveeRespectee && this.angleDebutRespectee;
    }

    public get contraintesRespectees(): boolean {
        return this.longueurRespectee &&
               this.anglesRespectees &&
               this.aucunCroisement;
    }
}
