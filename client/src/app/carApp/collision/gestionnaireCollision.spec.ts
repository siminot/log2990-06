import { TestBed, ComponentFixture} from "@angular/core/testing";
import {GestionnaireCollision } from "./gestionnaireCollisions";

describe("Gestionnaire de collisions", () => {
    let gestionnaireCollision: GestionnaireCollision;

    // beforeEach(async() => {
    //     TestBed.configureTestingModule({
    //     declarations: [GestionnaireCollision ],
    //     // providers: []
    //     }).compileComponents();
    // });
    beforeEach( () => {
        // fixture = TestBed.createComponent(GestionnaireCollision);
        // gestionnaireCollision = fixture.componentInstance;
        gestionnaireCollision = new GestionnaireCollision();
    });

    it("Construction", () => {
        expect(gestionnaireCollision).toBeTruthy();
    });
});
