import { TempsAffichage } from "../vue-tete-haute/vue-tete-haute/tempsAffichage";

const NBR_TOUR: number = 3;

export class TempsJoueur {

    private _nom: string;
    private _estAI: boolean;
    private _tempsCourse: TempsAffichage;
    private _tempsTours: Array<TempsAffichage>;
    private _ctrNbrTour: number;

    public constructor() {
        this._nom = "joueur";
        this._estAI = true;
        this._ctrNbrTour = 0;
        this.initialisationTemps();
    }

    private initialisationTemps(): void {
        this._tempsCourse = new TempsAffichage();
        this._tempsTours = new Array<TempsAffichage>(NBR_TOUR);
        for (let i: number = 0; i < NBR_TOUR; i++) {
            this._tempsTours[i] = new TempsAffichage();
        }
    }

    public set nom(nom: string) {
        this._nom = nom;
    }

    public get nom(): string {
        return this._nom;
    }

    public set definirAI(estAI: boolean) {
        this._estAI = estAI;
    }

    public get estAI(): boolean {
        return this._estAI;
    }

    public set definirTempsCourse(tempsCourse: number) {
        this._tempsCourse.tempsAffichable = tempsCourse;
    }

    public get tempsCourse(): TempsAffichage {
        return this._tempsCourse;
    }

    public set definirTempsTour(tempsTour: number) {
        if (this._ctrNbrTour < NBR_TOUR) {
            this._tempsTours[this._ctrNbrTour++].tempsAffichable = tempsTour;
        }
    }

    public get tempsTours(): Array<TempsAffichage> {
        return this._tempsTours;
    }

    public get sommeTempsTours(): number {
        let somme: number = 0;
        for (const tempsTour of this.tempsTours) {
            somme += tempsTour.temps;
        }

        return somme;
    }

}
