import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChoixCourseComponent } from "./choixCourse.component";
import { RouterTestingModule } from "@angular/router/testing";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { ApercuPisteComponent } from "../apercuPiste/apercuPiste.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ChoixCourseComponent: ", () => {
    let component: ChoixCourseComponent;
    let fixture: ComponentFixture<ChoixCourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [ RouterTestingModule, MatExpansionModule, MatDividerModule, HttpClientTestingModule ],
        providers: [ GestionnaireBDCourse ],
        declarations: [ ChoixCourseComponent, ApercuPisteComponent ]
    })
    .compileComponents().catch();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChoixCourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe("Constructeur: ", () => {
        it("should create: ", () => {
            expect(component).toBeTruthy();
        });
    });
});
