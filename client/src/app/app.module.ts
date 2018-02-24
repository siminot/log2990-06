import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { AppRoutingModule } from ".//app-routing.module";

import { GameComponent } from "./carApp/game-component/game.component";
import { RenderService } from "./carApp/render-service/render.service";
import {HttpeReqService} from "./crosswords/httpRequest/http-request.service";

import { DefinitionHComponent} from "./crosswords/definitionH/definitionH.component";
import { DefinitionVComponent} from "./crosswords/definitionV/definitionV.component";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";
import { GrilleComponent } from "./crosswords/grille/grille.component";
import { DefinitionComponent } from "./crosswords/definition/definition.component";
import { RequeteDeGrilleService } from "./crosswords/service-Requete-de-Grille/requete-de-grille.service";
import { ConfigPartieComponent } from "./crosswords/config-partie/config-partie.component";
import { DirectiveFocusDirective } from "./crosswords/directive-focus/directive-focus.directive";

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
        DefinitionVComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        RenderService,
        BasicService,
        RequeteDeGrilleService,
        HttpeReqService
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
