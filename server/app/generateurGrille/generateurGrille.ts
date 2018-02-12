import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { TAILLE_TEST, POURCENTAGE_TEST } from "./constantes";
import { Mockword } from "./../../../common/mockObject/mockWord";
import { MockOptionPartie } from "./../../../common/mockObject/mockOptionPartie";
import { Mot } from "./../serviceLexical/Mot";

import { GenerateurSquelette } from "./generateurSquelette";
import { GenerateurListeMots } from "./generateurListeMots";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<Mockword>;
        private generateurSquelette: GenerateurSquelette = new GenerateurSquelette(TAILLE_TEST, POURCENTAGE_TEST);
        private generateurListeMots: GenerateurListeMots = new GenerateurListeMots();
        private motsDejaPlaces: Array<string> = new Array<string>();
        private optionsPartie: MockOptionPartie;
        private listeMotsRemplis: Array<Mockword>;

        constructor() {
            this.initMatrice();
            this.optionsPartie = new MockOptionPartie("Facile", 1); // j'impose facile pour l'instant
        }

        private initMatrice(): void {
            this.listeMot = new Array<Mockword>();
            this.grille = new Array<Array<string>>();
            this.motsDejaPlaces = new Array<string>();
            this.listeMotsRemplis = new Array<Mockword>();
            this.grille = this.generateurSquelette.getSqueletteGrille();
            this.listeMot = this.generateurListeMots.donnerUneListe(this.grille);
        }

        private lireMotViaGrille(mot: Mockword) {
            let lecteur = "";
            const x = mot.getPremierX();
            const y = mot.getPremierY();

            for (let i = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    lecteur += this.grille[y + i][x];
                } else {
                    lecteur += this.grille[y][x + i];
                }
            }
            mot.setMot(lecteur);
            mot.setEtatAvantEcriture(lecteur);
        }

        private async remplirLaGrilleDeMotsSeq() {
            let tabMot: Mot[];
            for (let i = 0; i < this.listeMot.length; ++i) {
                this.lireMotViaGrille(this.listeMot[i]);
                tabMot = await this.demanderMot(this.listeMot[i])
                .then(() => {
                    this.listeMot[i].setListeMot(tabMot);
                    // il faut faire les updates multiples
                    this.affecterMot(tabMot[0], this.listeMot[i]);
                    this.ecrireDansLaGrille(this.listeMot[i]);
                })
                .catch(() => {
                    let j = i;
                    while (!this.listeMot[i].estLieAvecAutreMot(this.initMatrice[--j])) {
                        this.remiseMotAEtatInitial(this.listeMot[j]);
                    }
                    this.remiseMotAEtatInitial(this.listeMot[j]);
                    this.listeMot[j].prochainMot();
                    i = j;
                });
            }
        }

        private remplirLaGrilleDeMots() {
            this.remplirGrilleRecursif(0)
            .then(() =>  console.log("ca marche"))
            .catch((error) => console.log("wtf esti"));
        }

        private async remplirGrilleRecursif(indice: number): Promise<void> {

            indice++;
            this.lireMotViaGrille(this.listeMot[indice]);
            let lesMots: Mot[];
            lesMots = await this.demanderMot(this.listeMot[indice]);
            if (lesMots === undefined) {
                console.log("pas de mot");
                throw new Error("Pas de mot");
            }

            const loop = (i: number) => {
                console.log(i);
                console.log(this.grille);
                this.affecterMot(lesMots[i], this.listeMot[indice]);
                this.ecrireDansLaGrille(this.listeMot[indice]);
                this.remplirGrilleRecursif(indice)
                .catch(() => {
                    if ( ++i < lesMots.length) {
                        loop(i);
                    }
                });
                if (i === lesMots.length) {
                    throw new Error("pls");
                }
            };
            loop(0);

        }

    

       /* private remplirLaGrilleDeMots(ctr: number): void {
            const loop = (i: number) => {
                this.insererUnMot(i).then(() => {
                    if (i < this.listeMot.length - 1) {
                        i++;
                        loop(i++);
                    }
                })
                .catch( (resolve) => console.log("Erreur"));
            };
            loop(ctr);
        }*/

       /* private updateListeMot(mot: Mockword): void {
            const indexConstant = mot.getVertical() ? mot.getPremierX() : mot.getPremierY();

            for (const elem of this.listeMot) {
                if (elem.getVertical() !== mot.getVertical()) {
                    const premierIndex = elem.getVertical() ? elem.getPremierY() : elem.getPremierX();
                    const dernierIndex = premierIndex + elem.getLongueur() - 1;
                    const indexCharAModifier = mot.getVertical() ?
                    elem.getPremierY() - mot.getPremierY() : elem.getPremierX() - mot.getPremierX();

                    if (premierIndex <= indexConstant && indexConstant < dernierIndex ) {
                        let motModifie = elem.getMot();
                        const indexAModifier = indexConstant - premierIndex;
                        motModifie = motModifie.substring(0, indexAModifier)
                                      + mot.getMot().charAt(indexCharAModifier) + motModifie.substring(indexAModifier + 1);
                        console.log(elem);
                        elem.setMot(motModifie);
                    }
                }
            }
        }*/

       /* private insererUnMot(index: number): Promise<void> {
            this.lireMotViaGrille(this.listeMot[index]);

            return this.demanderMot(this.listeMot[index]).then( (data) => {
                this.updateListeMot(this.listeMot[index])
                .then();

                const loop = (i: number ) => {

                    })
                    .catch( (resolve) => console.log("Erreur"));
                };
                loop(ctr);
            });
        }*/

        private demanderMot(mot: Mockword): Promise<Mot[]> {

            let url: string;
            switch (this.optionsPartie.niveau) {

                case "Facile":
                case "Normal":
                url = "http://localhost:3000/servicelexical/commun/contrainte/" + mot.getMot();
                break;

                case "Difficile":
                url = "http://localhost:3000/servicelexical/noncommun/contrainte/" + mot.getMot();
                break;

                default: /*devrait jamais arriver?*/ break;
            }

            return WebRequest.json<Mot[]>(url);
        }

        private affecterMot(unMot: Mot, motAChanger: Mockword): Mot {
            // regarder avec simon si on doit trouver un mot en particulier dans la liste
            let indexDef = 0;
            const nbDef: number = unMot.definitions.length;
            switch (this.optionsPartie.niveau) {

                case "Normal":
                case "Difficile":
                if (unMot.definitions.length > 0) {    // S'il n'y a aucune autre def
                    indexDef = this.nombreAleatoire(nbDef) - 1;
                }
                break;

                default: /*devrait jamais arriver?*/ break;
            }

            motAChanger.setMot(unMot.mot);
            motAChanger.setDefinition(unMot.definitions[indexDef].definition);

            return unMot;
        }

        private ecrireDansLaGrille(mot: Mockword): void {
            const x = mot.getPremierX();
            const y = mot.getPremierY();

            for (let i = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    this.grille[y + i][x] = mot.getMot()[i];
                } else {
                    this.grille[y][x + i] = mot.getMot()[i];
                }
            }
        }
        private remiseMotAEtatInitial(mot: Mockword): void {
            const x = mot.getPremierX();
            const y = mot.getPremierY();

            for (let i = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    this.grille[y + i][x] = mot.getEtatAvantEcriture()[i];
                } else {
                    this.grille[y][x + i] = mot.getEtatAvantEcriture()[i];
                }
            }
        }


        // retourne un nmbre entre 1 et nbMax
        private nombreAleatoire(nbMax: number): number {
            const millisecondes = new Date().getMilliseconds();
            const MILLE = 1000;

            return Math.floor(millisecondes * nbMax / MILLE) + 1;
        }

                /* FONCTION BIDON POUR EXAMINER DES CHOSES */
        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initMatrice();
            // this.initListeMot();
            this.remplirLaGrilleDeMots();
            res.send(JSON.stringify(this.grille));
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {
            res.send(JSON.stringify(this.listeMot));
        }

    }
}

export = Route;
