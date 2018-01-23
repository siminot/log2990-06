import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./carApp/game-component/game.component";

import { RenderService } from "./carApp/render-service/render.service";
import { BasicService } from "./basic.service";
import { AppRoutingModule } from './/app-routing.module';
import { MainGrilleComponent } from './crosswords/main-grille/main-grille.component';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        MainGrilleComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        RenderService,
        BasicService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
