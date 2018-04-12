import { TempsAffichage } from "../vue-tete-haute/vue-tete-haute/tempsAffichage";

const NBR_TOUR: number = 3;

export class TempsJoueur {

    private nom: string;
    private estAI: boolean;
    private tempsCourse: TempsAffichage;
    private tempsTours: Array<TempsAffichage>;
    private ctrNbrTour: number;

    public constructor() {
        this.nom = "joueur";
        this.estAI = true;
        this.ctrNbrTour = 0;
        this.initialisationTemps();
    }

    private initialisationTemps(): void {
        this.tempsCourse = new TempsAffichage();
        this.tempsTours = new Array<TempsAffichage>(NBR_TOUR);
        for (let i: number = 0; i < NBR_TOUR; i++) {
            this.tempsTours[i] = new TempsAffichage();
        }
    }

    public set definirNom(nom: string) {
        this.nom = nom;
    }

    public get obtenirNom(): string {
        return this.nom;
    }

    public set definirAI(estAI: boolean) {
        this.estAI = estAI;
    }

    public get obtenirEstAI(): boolean {
        return this.estAI;
    }

    public set definirTempsCourse(tempsCourse: number) {
        this.tempsCourse.tempsAffichable = tempsCourse;
    }

    public get obtenirTempsCourse(): TempsAffichage {
        return this.tempsCourse;
    }

    public set definirTempsTour(tempsTour: number) {
        if (this.ctrNbrTour < NBR_TOUR) {
            this.tempsTours[this.ctrNbrTour++].tempsAffichable = tempsTour;
        }
    }

    public get obtenirTempsTours(): Array<TempsAffichage> {
        return this.tempsTours;
    }

}
