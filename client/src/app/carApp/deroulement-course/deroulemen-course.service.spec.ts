import { TestBed, inject } from "@angular/core/testing";

import { DeroulemenCourseService } from "./deroulemen-course.service";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { Point } from "../elementsGeometrie/point";
import { Vector3 } from "three";
import { Voiture } from "../voiture/voiture";

class MockGestionnaireScene {
    private points: Point[] = [ new Point(0, 0),
                                new Point(5, 5),
                                new Point(10, 10),
                                new Point(7, 2)];
    private pointDepart: Vector3 = new Vector3();

    public get obtenirPoints(): Point[] {
        return this.points;
    }

    public get obtenirZoneDepart(): Vector3 {
        return this.pointDepart;
    }
}

class MockGestionnaireVoitures {
    private _voitures: Voiture[] = [];
    public get voitures(): Voiture[] {
        return this._voitures;
    }
}

describe("DeroulemenCourseService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DeroulemenCourseService,
                        { provide: GestionnaireScene, useClass: MockGestionnaireScene },
                        { provide: GestionnaireVoitures, useClass: MockGestionnaireVoitures }]
        });
    });

    it("should be created", inject([DeroulemenCourseService], (service: DeroulemenCourseService) => {
        expect(service).toBeTruthy();
    }));
});
