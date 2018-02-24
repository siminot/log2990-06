import { Mot, Frequence } from "./Mot";
import { MotAPI } from "./MotAPI";

export class FormatteurDeMots {

    private mots: Mot[];

    constructor(motsAPI: MotAPI[]) {
        this.mots = this.convertirMotsAPI(motsAPI);
    }

    private convertirMotsAPI(motsAPI: MotAPI[]): Mot[] {
        const mots: Mot[] = [];

        for (const MOT_API of motsAPI) {
            mots.push(new Mot(MOT_API));
        }

        return mots;
    }

    public obtenirMots(frequence: Frequence): Mot[] {
        this.trierMotsSelonFrequence(frequence);
        this.retirerMotsInvalides();
        this.retirerMotSansDefinition();

        return this.mots;
    }

    private trierMotsSelonFrequence(frequence: Frequence): void {
        this.mots = this.mots.filter((mot: Mot) => mot.obtenirFrequence().valueOf() === frequence.valueOf());
    }

    private retirerMotsInvalides(): void {
        this.mots = this.mots.filter((mot: Mot) => !mot.contientCaractereInvalide());
    }

    private retirerMotSansDefinition(): void {
        this.mots = this.mots.filter((mot: Mot) => mot.possedeDefinition());
    }

}
