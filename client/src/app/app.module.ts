<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GameComponent } from './carApp/game-component/game.component';
import { AppRoutingModule } from './/app-routing.module';
import { BasicService } from './basic.service';
import { RenderService } from './carApp/render-service/render.service';
import { MainGrilleComponent } from './crosswords/main-grille/main-grille.component';
import { GrilleComponent } from './crosswords/grille/grille.component';
=======
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
// import { RequeteDeGrilleService } from "./crosswords/service-Requete-de-Grille/requete-de-grille.service";
>>>>>>> 02f24f6a71710e3d7cb9113bd9326fceb288f2ea
import { DefinitionComponent } from './crosswords/definition/definition.component';
import { RequeteDeGrilleService } from './crosswords/service-Requete-de-Grille/requete-de-grille.service';

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
        RenderService,
        BasicService,
        RequeteDeGrilleService
    ],
    bootstrap: [ AppComponent ],
    exports: [
        AppComponent,
        GameComponent,
        MainGrilleComponent,
        GrilleComponent,
        DefinitionComponent
    ]
})
export class AppModule { }
