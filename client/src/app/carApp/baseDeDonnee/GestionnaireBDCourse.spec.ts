import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";
import { GestionnaireBDCourse } from "./GestionnaireBDCourse";
import { PISTE1 } from "../piste/pisteTest";

describe("GestionnaireBDCourse", () => {

    let gestionnaire: GestionnaireBDCourse;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
    });

    beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
        gestionnaire = new GestionnaireBDCourse(httpClient);
    }));

    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(gestionnaire).toBeDefined();
        });

        it("objet est bien initialise", () => {
            expect(gestionnaire.pisteEdition).toEqual(null);
            expect(gestionnaire.pisteJeu).toEqual(null);
        });
    });

    describe("Obtenir les points de la piste", () => {
        it("le nombre de points retournes est correct pour une piste valide", () => {
            gestionnaire.pisteEdition = PISTE1;
            expect(gestionnaire["pointsEdition"].length).toEqual(PISTE1.points.length);
        });

        it("le nombre de points retournes est correct pour une piste nulle", () => {
            expect(gestionnaire.pointsJeu.length).toEqual(0);
        });
    });
});
