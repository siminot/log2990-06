import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TableauMeilleursTempsComponent } from "./tableau-meilleurs-temps.component";
import { Router } from "@angular/router";
import { GestionnaireDesTempsService } from "../GestionnaireDesTemps/gestionnaire-des-temps.service";

describe("TableauMeilleursTempsComponent", () => {
    let component: TableauMeilleursTempsComponent;
    let fixture: ComponentFixture<TableauMeilleursTempsComponent>;
    // tslint:disable-next-line:prefer-const
    let mockRouter: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableauMeilleursTempsComponent],
            providers: [GestionnaireDesTempsService,
                        { provide: Router, useValue: mockRouter }]
        })
            .compileComponents()
            .catch( () => {} );
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableauMeilleursTempsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Devrait bien construire", () => {
        expect(component).toBeTruthy();
    });

    it("Devrait recevoir une piste du gestionnaire BD.", () => {
        expect(component["_pisteCourante"]).toBeDefined();
    });

});
