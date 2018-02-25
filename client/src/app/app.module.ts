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
import { GestionnaireClavier } from "./carApp/clavier/gestionnaireClavier";
import { GestionnaireEcran } from "./carApp/ecran/gestionnaireEcran";

import { AppRoutingModule } from ".//app-routing.module";
import { HttpeReqService } from "./crosswords/httpRequest/http-request.service";

import { DefinitionHComponent} from "./crosswords/definitionH/definitionH.component";
import { DefinitionVComponent} from "./crosswords/definitionV/definitionV.component";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";
import { GrilleComponent } from "./crosswords/grille/grille.component";
import { DefinitionComponent } from "./crosswords/definition/definition.component";
import { RequeteDeGrilleService } from "./crosswords/service-Requete-de-Grille/requete-de-grille.service";
import { ConfigPartieComponent } from "./crosswords/config-partie/config-partie.component";
import { DirectiveFocusDirective } from "./crosswords/directive-focus/directive-focus.directive";
import { InfoJoueur1Component } from "./crosswords/info-joueur1/info-joueur1.component";
import { InfojoueurService } from "./crosswords/service-info-joueur/infojoueur.service";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        MainGrilleComponent,
        GrilleComponent,
        DefinitionComponent,
        ConfigPartieComponent,
        DirectiveFocusDirective,
        DefinitionHComponent,
        DefinitionVComponent,
        InfoJoueur1Component
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
        GestionnaireClavier,
        GestionnaireEcran,
        RequeteDeGrilleService,
        HttpeReqService,
        InfojoueurService
    ],
    bootstrap: [ AppComponent ],
    exports: [
        AppComponent,
        GameComponent,
        MainGrilleComponent,
        GrilleComponent,
        DefinitionVComponent,
        DefinitionHComponent
    ]
})
export class AppModule { }
