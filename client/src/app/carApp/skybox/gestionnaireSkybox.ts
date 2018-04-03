import { Injectable } from "@angular/core";
import { Mesh } from "three";
import { Skybox } from "./skybox";
import { TEMPS_JOURNEE_INITIAL } from "../constants";
import { TempsJournee } from "./tempsJournee";

export class ElementsInitialisationSkybox {
    public tempsJournee: TempsJournee;
    public paysage: string;
    public plancher: string;

    public constructor(tempsJournee: TempsJournee, paysage: string, plancher: string) {
        this.tempsJournee = tempsJournee;
        this.paysage = paysage;
        this.plancher = plancher;
    }
}

export const SKYBOX: ElementsInitialisationSkybox[] = [
    new ElementsInitialisationSkybox(TempsJournee.Nuit, "nuit1", "grass4"),
    new ElementsInitialisationSkybox(TempsJournee.Nuit, "nuit2", "pave1"),
    new ElementsInitialisationSkybox(TempsJournee.Jour, "jour1", "grass2"),
    new ElementsInitialisationSkybox(TempsJournee.Jour, "jour2", "roche1"),
];

@Injectable()
export class GestionnaireSkybox {

    private tempsJournee: TempsJournee;
    private skyboxCourante: Skybox;
    private indexAncienneSkybox: Map<TempsJournee, number>;
    private environnements: Map<TempsJournee, Skybox[]>;

    public get skybox(): Mesh {
        return this.skyboxCourante;
    }

    public constructor() {
        this.environnements = new Map<TempsJournee, Skybox[]>();
        this.indexAncienneSkybox = new Map<TempsJournee, number>();
        this.tempsJournee = TEMPS_JOURNEE_INITIAL;
        this.chargerSkybox();
        this.miseAJourSkybox();
    }

    private get skyboxSelonTemps(): Skybox[] {
        if (this.environnements.get(this.tempsJournee) === undefined) {
            this.environnements.set(this.tempsJournee , new Array<Skybox>());
        }

        return this.environnements.get(this.tempsJournee);
    }

    private get indexSelonTemps(): number {
        if (this.indexAncienneSkybox.get(this.tempsJournee) === undefined) {
            this.indexAncienneSkybox.set(this.tempsJournee , 0);
        }

        return this.indexAncienneSkybox.get(this.tempsJournee);
    }

    private get positionCouranteSkybox(): number {
        return this.skyboxSelonTemps.findIndex((paysage: Skybox) => this.skyboxCourante === paysage );
    }

    private chargerSkybox(): void {
        for (const elementInitialisation of SKYBOX) {
            this.tempsJournee = elementInitialisation.tempsJournee;
            this.skyboxSelonTemps.push(new Skybox(elementInitialisation));
        }
    }

    public changerTempsJournee(temps: TempsJournee): void {
        this.miseAJourAncienIndex();
        this.tempsJournee = temps;
        this.miseAJourSkybox();
    }

    private miseAJourSkybox(): void {
        this.skyboxCourante = this.skyboxSelonTemps[this.indexSelonTemps];
    }

    public changerDecor(): void {
        this.skyboxCourante = this.skyboxSelonTemps[(this.positionCouranteSkybox + 1) % this.skyboxSelonTemps.length];
    }

    private miseAJourAncienIndex(): void {
        this.indexAncienneSkybox.set(this.tempsJournee, this.positionCouranteSkybox);
    }
}
