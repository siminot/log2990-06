import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PisteComponent } from "./piste.component";

describe("PisteComponent", () => {
    let component: PisteComponent;
    let fixture: ComponentFixture<PisteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PisteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PisteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
