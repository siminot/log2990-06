import { GestionnaireEditionPiste } from "./gestionnaireEditionPiste";
import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

describe("GestionnaireEditionPiste", () => {
    let gestionnaire: GestionnaireEditionPiste;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GestionnaireEditionPiste, GestionnaireCameraPiste, GestionnaireEcran, GestionnaireSouris, GestionnaireBDCourse]
        });
    });

    beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
        const bd: GestionnaireBDCourse = new GestionnaireBDCourse(httpClient);
        gestionnaire = new GestionnaireEditionPiste(bd, new GestionnaireSouris(), new GestionnaireCameraPiste(), new GestionnaireEcran());
    }));

    describe("Constructeur", () => {
        it("Objet est construit", () => {
            expect(gestionnaire).toBeDefined();
        });
    });
});
