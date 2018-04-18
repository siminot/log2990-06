import { NbCaractMaxDirective } from "./nb-caract-max.directive";
import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
    template: "<input [appNbCaractMax]='5' categorie='minutes'>"
})
class TestNbCaractMaxComponent { }

describe("NbCaractMaxDirective", () => {
    let component: TestNbCaractMaxComponent;
    let fixture: ComponentFixture<TestNbCaractMaxComponent>;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestNbCaractMaxComponent, NbCaractMaxDirective]
        });
        fixture = TestBed.createComponent(TestNbCaractMaxComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css("input"));
    });
});
