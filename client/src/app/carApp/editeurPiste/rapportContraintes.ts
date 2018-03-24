export class RapportContraintes {

    public longueurRespectee: boolean;
    public angleArriveeRespectee: boolean;
    public angleDebutRespectee: boolean;
    public pasCroisementRespecte: boolean;

    public constructor() {
        this.longueurRespectee = false;
        this.angleArriveeRespectee = false;
        this.angleDebutRespectee = false;
        this.pasCroisementRespecte = false;
    }

    private get anglesRespectees(): boolean {
        return this.angleArriveeRespectee && this.angleDebutRespectee;
    }

    public get contraintesRespectees(): boolean {
        return  this.pasCroisementRespecte
                && this.longueurRespectee
                && this.anglesRespectees;
    }
}
