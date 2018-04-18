import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TableauMeilleursTempsComponent } from "./tableau-meilleurs-temps.component";
import { Router } from "@angular/router";
import { GestionnaireDesTempsService } from "../GestionnaireDesTemps/gestionnaire-des-temps.service";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { TimerService } from "../timer/timer.service";
import { Point } from "../elementsGeometrie/point";
import { PisteBD } from "../piste/IPisteBD";
import { MatDividerModule } from "@angular/material/divider";
import { ITempsBD } from "../piste/ITempsBD";

describe("TableauMeilleursTempsComponent", () => {
    let component: TableauMeilleursTempsComponent;
    let fixture: ComponentFixture<TableauMeilleursTempsComponent>;
    // tslint:disable-next-line:prefer-const
    let mockRouter: Router;

    const LONGUEUR: number = 100;
    const PISTE_TEST: Point[] = [
        new Point(0, 0),
        new Point(-LONGUEUR, 0),
        new Point(-LONGUEUR, -LONGUEUR),
        new Point(0, -LONGUEUR),
    ];
    const PISTE: PisteBD = {
        _id: "2",
        nom: "Piste 2",
        description: "Champs de ble",
        points: PISTE_TEST,
        type: "Type1",
        temps: [{ nom: "Joe La Bine", min: 0, sec: 0, milliSec: 0 },
                { nom: "Joe La Bine", min: 1, sec: 0, milliSec: 0 },
                { nom: "Joe La Bine", min: 2, sec: 0, milliSec: 0 },
                { nom: "Joe La Bine", min: 0, sec: 30, milliSec: 0 }],
        nbFoisJoue: 2
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ MatDividerModule ],
            declarations: [ TableauMeilleursTempsComponent ],
            providers: [ TimerService, GestionnaireDesTempsService, GestionnaireBDCourse, HttpClient, HttpHandler,
                         { provide: Router, useValue: mockRouter }]
        })
            .compileComponents()
            .catch( () => { throw new Error("Erreur de la creation du test"); } );
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(TableauMeilleursTempsComponent);
        component = fixture.componentInstance;
        component["_pisteCourante"] = PISTE;
        component["classerTempsTableau"]();
    });

    it("Devrait bien construire", () => {
        expect(component).toBeTruthy();
    });

    describe("Piste courante : ", () => {
        it("L'attribut devrait être défini.", () => {
            expect(component["_pisteCourante"]).toBeDefined();
        });
        it("Devrait contenir 4 pistes.", () => {
            const NB_PISTES_ATTENDU: number = 4;
            expect(component["_pisteCourante"].temps.length).toBe(NB_PISTES_ATTENDU);
        });
        it("Devrait contenir un des temps défini plus haut.", () => {
            const UN_TEMPS: ITempsBD = { nom: "Joe La Bine", min: 0, sec: 0, milliSec: 0 };
            expect(component["_pisteCourante"].temps).toContain(UN_TEMPS);
        });
    });
});
