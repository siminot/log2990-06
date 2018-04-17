import { TestBed, ComponentFixture } from "@angular/core/testing";
import { EstUnChiffreDirective } from "./est-un-chiffre.directive";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
    template: "<input [appEstUnChiffre]='true' categorie='minutes'>"
})
class TestEstUnChiffreComponent {

}

describe("EstUnChiffreDirective", () => {
    let component: TestEstUnChiffreComponent;
    let fixture: ComponentFixture<TestEstUnChiffreComponent>;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestEstUnChiffreComponent, EstUnChiffreDirective]
        });
        fixture = TestBed.createComponent(TestEstUnChiffreComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css("input"));
    });
});
