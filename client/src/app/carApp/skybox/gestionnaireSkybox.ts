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
    private environnementsJour: Skybox[];
    private environnementsNuit: Skybox[];

    public get skybox(): Mesh {
        return this.skyboxCourante;
    }

    public constructor() {
        this.environnementsJour = [];
        this.environnementsNuit = [];
        this.chargerSkybox();
        this.changerPourNuit();
    }

    private chargerSkybox(): void {
        for (const liens of SKYBOX) {
            if (liens.tempsJournee === TempsJournee.Jour) {
                this.environnementsJour.push(new Skybox(TempsJournee.Jour, liens.paysage, liens.plancher));
            } else {
                this.environnementsNuit.push(new Skybox(TempsJournee.Nuit, liens.paysage, liens.plancher));
            }
        }
    }

    public changerTempsJournee(temps: TempsJournee): void {
        this.tempsJournee = temps;

        this.estJour
            ? this.changerPourJour()
            : this.changerPourNuit();

        this.changerDecor();
    }

    private changerPourJour(): void {
        this.skyboxCourante = this.environnementsJour[0];
    }

    private changerPourNuit(): void {
        this.skyboxCourante = this.environnementsNuit[0];
    }

    public changerDecor(): void {
        this.skyboxCourante = this.paysagesSelonTemps[(this.positionCouranteSkybox + 1) % this.paysagesSelonTemps.length];
    }

    private get positionCouranteSkybox(): number {
        return this.paysagesSelonTemps.findIndex((paysage: Skybox) => this.skyboxCourante === paysage );
    }

    private get paysagesSelonTemps(): Skybox[] {
        if (this.estJour) {
            return this.environnementsJour;
        } else {
            return this.environnementsNuit;
        }
    }

    private get estJour(): boolean {
        return this.tempsJournee === TempsJournee.Jour;
    }
}
