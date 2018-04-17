import {GestionnaireCollision } from "./gestionnaireCollisions";
import { Voiture } from "../voiture/voiture";
import { Vector3 } from "three";

const NOMBRE_AUTO: number = 4;
const MOCK_POSITION: number = 2;
const MOCK_VITESSE: number = 2;
const XY: number = -0.045454545454545456;
const Z: number = 1.9545454545454546;
const REPONSE_FORMULE: Vector3 = new Vector3(XY , XY, Z);
describe("Gestionnaire de collisions", () => {
    let gestionnaireCollision: GestionnaireCollision;

    beforeEach( () => {
        const voitureAI: Array<Voiture> = new Array<Voiture>();
        const voitureJoueur: Voiture = new Voiture();
        for (let i: number = 0; i < NOMBRE_AUTO ; i++) {
            voitureAI.push(new Voiture());
        }
        gestionnaireCollision = new GestionnaireCollision(voitureJoueur, voitureAI);

    });

    it("Construction", () => {
        expect(gestionnaireCollision).toBeTruthy();
    });

    it("Vérification de la formule vitesse", () => {
        const voitures: Voiture[] = gestionnaireCollision["voitures"];
        const voitureA: Voiture = voitures[0];
        const voitureB: Voiture = voitures[1];
        const FACTEUR_VITESSE: number = -10;
        const nouvelleVitesseA: Vector3 = new Vector3(0, 0, MOCK_VITESSE);
        const nouvelleVitesseB: Vector3 = new Vector3(0, 0, MOCK_VITESSE * FACTEUR_VITESSE);
        voitureA.position.set(MOCK_POSITION + 1, MOCK_POSITION + 1, MOCK_POSITION + 1);
        voitureB.position.set(MOCK_POSITION, MOCK_POSITION, MOCK_POSITION);
        voitureA.speed = nouvelleVitesseA;
        voitureB.speed  = nouvelleVitesseB;
        const formuleFonction: Function = gestionnaireCollision["calculeNouvelleVitesse"];
        expect(formuleFonction(voitureA, voitureB)).toEqual(REPONSE_FORMULE);
    });

});
