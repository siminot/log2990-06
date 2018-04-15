
const MILSEC_PAR_MIN: number = 60000;
const MILSEC_PAR_SEC: number = 1000;
const SEC_PAR_MIN: number = 60;
const DIVISEUR_POUR_DEUX_DECIMALS: number = 10;

export class TempsAffichage {

    private _minutes: string;
    private _secondes: string;
    private _milliseconde: string;
    private _temps: number;

    public constructor() {
        this._temps = 0;
        this._minutes = "--";
        this._secondes = "--";
        this._milliseconde = "--";
    }

    public set tempsAffichable(temps: number) {
        this._temps = temps;
        this._minutes = this.formaterTempsMinute(temps);
        this._secondes = this.formaterTempsSec(temps);
        this._milliseconde = this.formaterTempsMS(temps);
    }

    public get tempsFormate(): string {
        return this._minutes + " : " + this._secondes + " : " + this._milliseconde;
    }

    public get obtenirTemps(): number {
        return this._temps;
    }

    private ajouterZero(temps: string): string {
        if (temps.length === 1) {
            temps = "0" + temps;
        }

        return temps;
    }

    private formaterTempsMinute(temps: number): string {
        let tempsMin: string = "" + Math.floor(temps / MILSEC_PAR_MIN);
        tempsMin = this.ajouterZero(tempsMin);

        return tempsMin;
    }

    private formaterTempsSec(temps: number): string {
        let tempsSec: string = "" + Math.floor(temps / MILSEC_PAR_SEC) % SEC_PAR_MIN;
        tempsSec = this.ajouterZero(tempsSec);

        return tempsSec;
    }

    private formaterTempsMS(temps: number): string {
        let tempsMS: string = "" + Math.floor((temps % MILSEC_PAR_SEC) / DIVISEUR_POUR_DEUX_DECIMALS);
        tempsMS = this.ajouterZero(tempsMS);

        return tempsMS;
    }
    

}
