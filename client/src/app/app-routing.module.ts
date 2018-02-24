import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { GameComponent } from "./carApp/game-component/game.component";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";

const routes: Routes = [
  { path: "CarGame", component: GameComponent },
  { path: "CrosswordsGame", component: MainGrilleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
