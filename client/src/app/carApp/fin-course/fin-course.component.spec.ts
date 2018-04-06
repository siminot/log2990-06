import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FinCourseComponent } from "./fin-course.component";

describe("FinCourseComponent", () => {
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

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
