import { TempsJoueur } from "../GestionnaireDesTemps/tempsJoueur";

// tslint:disable:no-magic-numbers

const tempsJoueur1: TempsJoueur = new TempsJoueur();
tempsJoueur1.definirAI = false;
tempsJoueur1.definirTempsCourse = 150000;
for (let i: number = 0; i < 3; i++) {
    tempsJoueur1.definirTempsTour = 50000;
}

const tempsJoueur2: TempsJoueur = new TempsJoueur();
tempsJoueur2.definirAI = false;
tempsJoueur2.definirTempsCourse = 150000;
for (let i: number = 0; i < 3; i++) {
    tempsJoueur2.definirTempsTour = 50000;
}

const tempsJoueur3: TempsJoueur = new TempsJoueur();
tempsJoueur3.definirAI = false;
tempsJoueur3.definirTempsCourse = 150000;
for (let i: number = 0; i < 3; i++) {
    tempsJoueur3.definirTempsTour = 50000;
}

const tempsJoueur4: TempsJoueur = new TempsJoueur();
tempsJoueur4.definirAI = false;
tempsJoueur4.definirTempsCourse = 150000;
for (let i: number = 0; i < 3; i++) {
    tempsJoueur4.definirTempsTour = 50000;
}

export const resultatsBidon: Array<TempsJoueur>
    = new Array<TempsJoueur>(tempsJoueur1, tempsJoueur2, tempsJoueur3, tempsJoueur4);
