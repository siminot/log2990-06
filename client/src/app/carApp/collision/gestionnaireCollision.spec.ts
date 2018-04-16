import { TestBed, ComponentFixture} from "@angular/core/testing";
import {GestionnaireCollision } from "./gestionnaireCollisions";
import { Voiture } from "../voiture/voiture";

const NOMBRE_AUTO: number = 4;
describe("Gestionnaire de collisions", () => {
    let gestionnaireCollision: GestionnaireCollision;
    // let fixture: ComponentFixture;

    beforeEach(async() => {
        TestBed.configureTestingModule({
        declarations: [GestionnaireCollision ],
        // providers: []
        }).compileComponents();
    });
    beforeEach( () => {
        // fixture = TestBed.createComponent(GestionnaireCollision);
        // gestionnaireCollision = fixture.componentInstance;
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
});
