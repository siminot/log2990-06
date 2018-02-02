import { injectable, } from "inversify";
import { Response } from "express";
import * as WebRequest from "web-request";

import { Mot, Frequence } from "./Mot";
import { ContrainteMot } from "./ContrainteMot";
import { MotAPI } from "./MotAPI";

module moduleServiceLexical {

    const URL = "https://api.datamuse.com/words?sp=";
    const FLAG = "&md=df&max=1000";

    @injectable()
    export class ServiceLexical {

        public servirMots(contrainte: string): Promise<Mot[]> {
            const contraintes: String = this.modifierContraintePourAPI(contrainte);

            if (this.requeteEstValide(contrainte)) {
                return this.obtenirMotsSelonContrainte(contraintes);
            } else {
                throw Error("Format de la requete invalide");
            }
        }

        private modifierContraintePourAPI(contrainte: string ): String {
            let contrainteAPI: String = "";

            for (let i = 0 ; i < contrainte.length ; i++) {
                if (contrainte[i] === ContrainteMot.LETTRE_INCONNUE) {
                    contrainteAPI += "?";
                } else {
                    contrainteAPI += contrainte[i];
                }
            }

            return contrainteAPI;
        }

        private obtenirMotsSelonContrainte(contrainte: String): Promise<Mot[]> {
            const url = URL + contrainte + FLAG;

            return WebRequest.json<MotAPI[]>(url).then((data) => this.retirerMotsSansDefinition(data));
        }

        private retirerMotsSansDefinition(data: MotAPI[]): Mot[] {
            const dictionnaire: Mot[] = [];

            for (const objet of data) {
                const mot = new Mot(objet.word, objet.defs, objet.tags[0]);
                if (mot.possedeDefinition()) {
                    dictionnaire.push(mot);
                }
            }

            return dictionnaire;
        }

        private trierMotsSelonFrequence(liste: Mot[], frequence: Frequence): Mot[] {
            return liste.filter((mot) => mot.obtenirFrequence().valueOf() === frequence.valueOf());
        }

        public servirMotsSelonFrequence(contrainte: string, frequence: Frequence, res: Response): void {
            this.servirMots(contrainte)
                .then((dictionnaire) => res.send(this.trierMotsSelonFrequence(dictionnaire, frequence)));
        }

        public obtenirDefinitionsMot(mot: string, res: Response): void {
            this.obtenirMotsSelonContrainte(mot)
                .then((dictionnaire) => res.send(dictionnaire[0]));
        }

        private requeteEstValide(contrainte: String): boolean {
            // A completer
            return true;
        }
    }
}

export = moduleServiceLexical;
