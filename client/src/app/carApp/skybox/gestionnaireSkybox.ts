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
    private skyboxCourante: Mesh;
    private environnementsJour: Skybox[];
    private environnementsNuit: Skybox[];

    public get skybox(): Mesh {
        return this.skyboxCourante;
    }

    public constructor() {
        this.tempsJournee = TempsJournee.Nuit;
        this.environnementsJour = [];
        this.environnementsNuit = [];
        this.chargerSkybox();
        this.skyboxCourante = this.environnementsNuit[0];
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

    private positionCouranteSkybox(): number {
        return this.obtenirPaysagesSelonTemps().findIndex((paysage) => this.skyboxCourante === paysage );
    }

    private obtenirPaysagesSelonTemps(): Skybox[] {
        if (this.tempsJournee === TempsJournee.Nuit) {
            return this.environnementsNuit;
        } else {
            return this.environnementsJour;
        }
    }

    public changerTempsJournee(): void {
        if (this.tempsJournee === TempsJournee.Nuit) {
            this.tempsJournee = TempsJournee.Jour;
            this.skyboxCourante = this.environnementsJour[0];
        } else {
            this.tempsJournee = TempsJournee.Nuit;
            this.skyboxCourante = this.environnementsNuit[0];
        }
        this.changerDecor();
    }

    public changerDecor(): void {
        const tableau: Skybox[] = this.obtenirPaysagesSelonTemps();
        this.skyboxCourante = tableau[(this.positionCouranteSkybox() + 1) % tableau.length];
    }
}
