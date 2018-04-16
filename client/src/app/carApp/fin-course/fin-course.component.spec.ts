import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FinCourseComponent } from "./fin-course.component";

describe("FinCourseComponent: ", () => {
    let component: FinCourseComponent;
    let fixture: ComponentFixture<FinCourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
            let rangsSontNonNuls: boolean = true;
            for (const resultat of component.resultatsCourse) {
                if (resultat.rang === null) {
                    rangsSontNonNuls = false;
                }
            }
            expect(rangsSontNonNuls).toEqual(true);
        });
    });

});
