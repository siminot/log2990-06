
export class RapportContraintes {

    public longueurRespectee: boolean;
    public angleArriveeRespectee: boolean;
    public angleDebutRespectee: boolean;
    public nombreDeCroisement: number;

    public constructor() {
        this.longueurRespectee = true;
        this.angleArriveeRespectee = false;
        this.angleDebutRespectee = false;
        this.nombreDeCroisement = 0; // -1;
    }

    public get aucunCroisement(): boolean {
        return this.nombreDeCroisement === 0;
    }

    public get anglesRespectees(): boolean {
        return this.angleArriveeRespectee && this.angleDebutRespectee;
    }

    public get contraintesRespectees(): boolean {
        return this.longueurRespectee &&
               this.anglesRespectees &&
               this.aucunCroisement;
    }
}
