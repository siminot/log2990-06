import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FinCourseComponent } from "./fin-course.component";
import { RouterTestingModule } from "@angular/router/testing";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { GestionnaireDesTempsService } from "../GestionnaireDesTemps/gestionnaire-des-temps.service";
import { Router } from "@angular/router";
import { resultatsBidon } from "./resultatBidon";
import { pisteBidon } from "./pisteBidon";
import { PisteBD } from "../piste/IPisteBD";
import { TempsJoueur } from "../GestionnaireDesTemps/tempsJoueur";

class GestionnaireBDCourseBidon {
    public pisteJeu: PisteBD = pisteBidon;
}

class GestionnaireDesTempsBidon {
    public obtenirTempsDesJoueurs(): Array<TempsJoueur> {
        return resultatsBidon;
    }
}
// tslint:disable-next-line:prefer-const
let routerBidon: Router;

describe("FinCourseComponent: ", () => {
    let component: FinCourseComponent;
    let fixture: ComponentFixture<FinCourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ FinCourseComponent ],
        providers: [ { provide: Router, useValue: routerBidon },
                     { provide: GestionnaireBDCourse, useClass: GestionnaireBDCourseBidon },
                     { provide: GestionnaireDesTempsService, useClass: GestionnaireDesTempsBidon } ]
    })
    .compileComponents().catch();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FinCourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe("Constructeur: ", () => {
        it("should create: ", () => {
            expect(component).toBeTruthy();
        });
    });

    describe("nom de la piste", () => {
        it("le nom de la piste devrait etre le bon", () => {
            expect(component.nomPiste).toBe("bob");
        });
    });

    describe("resultats", () => {
        it("ils sont thruthy", () => {
            expect(component.resultatsCourse).toBeTruthy();
        });
    });

    describe("Classer les temps: ", () => {
        it("les temps devrait etre classer en nombre croissant", () => {
            let plusPetitTemps: number = 0;
            let estBienClasse: boolean = true;
            for (const resultat of component.resultatsCourse) {
                if (plusPetitTemps <= resultat.tempsCourse.temps) {
                    plusPetitTemps = resultat.tempsCourse.temps;
                } else {
                    estBienClasse = false;
                }
            }
            expect(estBienClasse).toEqual(true);
        });
    });

    describe("Ajouter les positions: ", () => {
        it("les positions devrait etre non nulles", () => {
            let positionsSontNonNulles: boolean = true;
            for (const resultat of component.resultatsCourse) {
                if (resultat.position === null) {
                    positionsSontNonNulles = false;
                }
            }
            expect(positionsSontNonNulles).toEqual(true);
        });
    });

});
