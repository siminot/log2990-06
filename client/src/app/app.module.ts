import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./carApp/game-component/game.component";

import { RenderService } from "./carApp/render-service/render.service";
import { BasicService } from "./basic.service";
import { AppRoutingModule } from ".//app-routing.module";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";
import { GrilleComponent } from "./crosswords/grille/grille.component";
import { RequeteDeGrilleService } from "./crosswords/service-Requete-de-Grille/requete-de-grille.service";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        MainGrilleComponent,
        GrilleComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        RenderService,
        BasicService,
        RequeteDeGrilleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
