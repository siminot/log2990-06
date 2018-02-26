import { Injectable } from "@angular/core";
import { Mesh } from "three";
import { Skybox, TempsJournee } from "./skybox";

export class ConstructionSkybox {
    public tempsJournee: TempsJournee;
    public paysage: string;
    public plancher: string;

    public constructor(tempsJournee: TempsJournee, paysage: string, plancher: string) {
        this.tempsJournee = tempsJournee;
        this.paysage = paysage;
        this.plancher = plancher;
    }
}

export const SKYBOX: ConstructionSkybox[] = [
    new ConstructionSkybox(TempsJournee.Nuit, "nuit1", "grass4"),
    new ConstructionSkybox(TempsJournee.Nuit, "nuit2", "pave1"),
    new ConstructionSkybox(TempsJournee.Jour, "jour1", "grass2"),
    new ConstructionSkybox(TempsJournee.Jour, "jour2", "roche1"),
];

@Injectable()
export class GestionnaireSkybox {

    private tempsJournee: TempsJournee;
    private skyboxCourante: Skybox;
    private indexAncienneSkybox: number[];
    private environnements: Skybox[][];

    public get skybox(): Mesh {
        return this.skyboxCourante;
    }

    public constructor() {
        this.environnements = [[], []];
        this.indexAncienneSkybox = [0, 0];
        this.tempsJournee = TempsJournee.Nuit;
        this.chargerSkybox();
        this.miseAJourSkybox();
    }

    private chargerSkybox(): void {
        for (const liens of SKYBOX) {
            this.environnements[liens.tempsJournee].push(new Skybox(liens.tempsJournee, liens.paysage, liens.plancher));
        }
    }

    public changerTempsJournee(temps: TempsJournee): void {
        this.miseAJourAncienIndex();
        this.tempsJournee = temps;
        this.miseAJourSkybox();
    }

    private miseAJourSkybox(): void {
        this.skyboxCourante = this.environnements[this.tempsJournee][this.indexAncienneSkybox[this.tempsJournee]];
    }

    public changerDecor(): void {
        this.skyboxCourante = this.paysagesSelonTemps[(this.positionCouranteSkybox + 1) % this.paysagesSelonTemps.length];
    }

    private miseAJourAncienIndex(): void {
        this.indexAncienneSkybox[this.tempsJournee] = this.positionCouranteSkybox;
    }

    private get positionCouranteSkybox(): number {
        return this.paysagesSelonTemps.findIndex((paysage: Skybox) => this.skyboxCourante === paysage );
    }

    private get paysagesSelonTemps(): Skybox[] {
        return this.environnements[this.tempsJournee];
    }
}
