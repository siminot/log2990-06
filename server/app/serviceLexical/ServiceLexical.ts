import "reflect-metadata";
import { injectable, } from "inversify";
import { Response } from "express";

import { Mot, Frequence } from "./Mot";
import { MotAPI } from "./MotAPI";

import { FormatteurDeMots } from "./FormatteurDeMots";
import { MessagerAPI } from "./MessagerAPI";

const NOMBRE_MAX_REQUETE = 1000;
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
                res.send(null);
            }
        }

        public servirMotsSelonContrainte(contrainte: string, frequence: Frequence, res: Response): void {
            this.obtenirMotsDeLAPI(contrainte, NOMBRE_MAX_REQUETE)
            .then((motsAPI: MotAPI[]) => this.renvoyerResultat(this.obtenirMotsFormattes(motsAPI, frequence), res))
            .catch(() => res.send(new Error(MESSAGE_ERREUR_API_EXTERNE)));
        }
    }
}

export = moduleServiceLexical;
