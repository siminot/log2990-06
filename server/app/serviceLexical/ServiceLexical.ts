import "reflect-metadata";
import { injectable, } from "inversify";
import { Response } from "express";

import { Mot, Frequence } from "./Mot";
import { MotAPI } from "./MotAPI";

import { FormatteurDeMots } from "./FormatteurDeMots";
import { MessagerAPI } from "./MessagerAPI";

const NOMBRE_MAX_REQUETE = 1000;
const MESSAGE_AUCUN_RESULTAT = "Aucun resultat";
const MESSAGE_ERREUR_API_EXTERNE = "Erreur de l'API externe";

module moduleServiceLexical {

    @injectable()
    export class ServiceLexical {

        private async obtenirMotsDeLAPI(contrainte: string, nombreDeMots: number): Promise<MotAPI[]> {
            const messager = new MessagerAPI();

            return messager.obtenirMotsDeLAPI(contrainte, nombreDeMots);
        }

        private obtenirMotsFormattes(motsAPI: MotAPI[], frequence: Frequence): Mot[] {
            const formatteur = new FormatteurDeMots(motsAPI);

            return formatteur.obtenirMots(frequence);
        }

        private renvoyerResultat(dictionnaire: Mot[], res: Response): void {
            if (dictionnaire.length > 0) {
                res.send(dictionnaire);
            } else {
                res.send(MESSAGE_AUCUN_RESULTAT);
            }
        }

        public servirMotsSelonContrainte(contrainte: string, frequence: Frequence, res: Response): void {
            this.obtenirMotsDeLAPI(contrainte, NOMBRE_MAX_REQUETE)
            .then((motsAPI: MotAPI[]) => this.renvoyerResultat(this.obtenirMotsFormattes(motsAPI, frequence), res))
            .catch(() => res.send(new Error(MESSAGE_ERREUR_API_EXTERNE)));
        }

        // Méthodes pas utilisées... à effacer?

        // Services de mots

        // Obtention des définitions d'un seul mot
        /* public servirDefinitionsMot(mot: string, res: Response): void {
            if (this.estUnMotValide(mot)) {
                this.obtenirMotsDeLAPI(mot, 1)
                    .then((dictionnaire: Mot[]) => {
                        if ((dictionnaire.length !== 0) && (dictionnaire[0].definitions !== null)) {
                            res.send(dictionnaire[0]);
                        } else {
                            res.send(MESSAGE_AUCUN_RESULTAT);
                        }
                    })
                    .catch(() => { res.send(new Error(MESSAGE_ERREUR_API_EXTERNE)); });
            } else {
                throw new Error(MESSAGE_REQUETE_INVALIDE);
            }
        }

        private estUnMotValide(mot: string): boolean {
            for (let i = 0; i < mot.length; i++) {
                if (!mot.toLowerCase().charAt(i).match(/[a-z]/)) {
                    return false;
                }
            }

            return true;
        }

        // Obtention des mots selon la longueur
        public servirMotsSelonLongueur(longueur: string, frequence: Frequence, res: Response): void {
            const LONGUEUR: number = Number.parseInt(longueur);
            if (!isNaN(LONGUEUR)) {
                this.obtenirMotsFormattes(this.obtenirContrainteLongueur(LONGUEUR))
                    .then((dictionnaire: Mot[]) => {
                        this.renvoyerMots(this.trierMotsSelonFrequence(dictionnaire, frequence), res);
                    })
                    .catch(() => { res.send(Error(MESSAGE_ERREUR_API_EXTERNE)); });
            } else {
                throw new Error(MESSAGE_REQUETE_INVALIDE);
            }
        }

        private obtenirContrainteLongueur(longueur: number): string {
            let contrainte = "";

            for (let i = 0; i < longueur; i++) {
                contrainte += LETTRE_INCONNUE;
            }

            return contrainte;
        } */
    }
}

export = moduleServiceLexical;
