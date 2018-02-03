import { injectable, } from "inversify";
import { Response } from "express";
import * as WebRequest from "web-request";

import { Mot, Frequence } from "./Mot";
import { ContrainteMot } from "./ContrainteMot";
import { MotAPI } from "./MotAPI";

module moduleServiceLexical {

    @injectable()
    export class ServiceLexical {

        private static readonly URL: string = "https://api.datamuse.com/words?sp=";
        private static readonly FLAG: string = "&md=df&max=";
        private static readonly NOMBRE_MAX_REQUETE: number = 1000;

        // Obtention de plusieurs mots

        public servirMots(contrainte: string): Promise<Mot[]> {
            const contraintes: String = this.modifierContraintePourAPI(contrainte);

            if (this.requeteEstValide(contrainte)) {

                return this.obtenirMotsSelonContrainte(contraintes, ServiceLexical.NOMBRE_MAX_REQUETE)
                           .then((data: Mot[]) => this.filtrerMots(data));
            } else {
                throw Error("Format de la requete invalide");
            }
        }

        private modifierContraintePourAPI(contrainte: string): String {
            let contrainteAPI: String = "";

            for (let i = 0; i < contrainte.length; i++) {
                if (contrainte[i] === ContrainteMot.LETTRE_INCONNUE) {
                    contrainteAPI += "?";
                } else {
                    contrainteAPI += contrainte[i];
                }
            }

            return contrainteAPI;
        }

        private requeteEstValide(contrainte: String): boolean {
            // A completer
            return true;
        }

        // Utilisation de l'API externe

        private obtenirMotsSelonContrainte(contrainte: String, nombreDeMots: number): Promise<Mot[]> {
            const url: string = ServiceLexical.URL + contrainte + ServiceLexical.FLAG + String(nombreDeMots);

            return WebRequest.json<MotAPI[]>(url).then((data: MotAPI[]) => this.convertirMotsAPI(data));
        }

        private convertirMotsAPI(data: MotAPI[]): Mot[] {
            const dictionnaire: Mot[] = [];

            for (const motAPI of data) {
                dictionnaire.push(new Mot(motAPI));
            }

            return dictionnaire;
        }

        // Obtention d'une définition d'un mot

        public obtenirDefinitionsMot(mot: string, res: Response): void {
            this.obtenirMotsSelonContrainte(mot, 1)
                .then((dictionnaire: Mot[]) => res.send(dictionnaire[0]));
        }

        // Obtention des mots selon la fréquence

        public servirMotsSelonFrequence(contrainte: string, frequence: Frequence, res: Response): void {
            this.servirMots(contrainte)
                .then((dictionnaire: Mot[]) => res.send(this.trierMotsSelonFrequence(dictionnaire, frequence)));
        }

        private trierMotsSelonFrequence(liste: Mot[], frequence: Frequence): Mot[] {
            return liste.filter((mot: Mot) => mot.obtenirFrequence().valueOf() === frequence.valueOf());
        }

        // Filtrer les mots

        private filtrerMots(liste: Mot[]): Mot[] {
            const listeTriee: Mot[] = this.retirerMotSansDefinition(liste);

            return this.retirerMotInvalides(this.retirerMotSansDefinition(listeTriee));
        }

        private retirerMotInvalides(liste: Mot[]): Mot[] {
            return liste.filter((mot: Mot) => !mot.contientCaractereInvalide());
        }

        private retirerMotSansDefinition(liste: Mot[]): Mot[] {
            return liste.filter((mot: Mot) => mot.possedeDefinition());
        }
    }
}

export = moduleServiceLexical;
