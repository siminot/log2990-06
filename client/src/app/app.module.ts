import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./carApp/game-component/game.component";

import { ServiceDeRendu } from "./carApp/serviceDeRendu/serviceDeRendu";
import { GestionnaireScene } from "./carApp/scene/GestionnaireScene";
import { GestionnaireCamera } from "./carApp/camera/GestionnaireCamera";
import { GestionnaireSkybox } from "./carApp/skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "./carApp/voiture/gestionnaireVoitures";

import { BasicService } from "./basic.service";
import { AppRoutingModule } from ".//app-routing.module";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";
import { GrilleComponent } from "./crosswords/grille/grille.component";
import { RequeteDeGrilleService } from "./crosswords/service-Requete-de-Grille/requete-de-grille.service";
import { DefinitionComponent } from "./crosswords/definition/definition.component";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        MainGrilleComponent,
        GrilleComponent,
        DefinitionComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        ServiceDeRendu,
        GestionnaireScene,
        GestionnaireCamera,
        GestionnaireSkybox,
        GestionnaireVoitures,
        BasicService,
        RequeteDeGrilleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
