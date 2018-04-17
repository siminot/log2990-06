import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FinCourseComponent } from "./fin-course.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("FinCourseComponent: ", () => {
    let component: FinCourseComponent;
    let fixture: ComponentFixture<FinCourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ FinCourseComponent ]
    })
    .compileComponents();
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

    describe("Ajouter les rangs: ", () => {
        it("les rangs devrait etre non nuls", () => {
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
