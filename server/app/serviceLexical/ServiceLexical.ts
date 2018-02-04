import { injectable, } from "inversify";
import { Response } from "express";
import * as WebRequest from "web-request";

import { Mot, Frequence } from "./Mot";
import { ContrainteMot } from "./ContrainteMot";
import { MotAPI } from "./MotAPI";

module moduleServiceLexical {

    @injectable()
    export class ServiceLexical {

        private static readonly LETTRE_INCONNUE: string = "_";
        private static readonly CONTRAINTE_VALIDE: string = "(([A-Z])|([a-z])|([" + ServiceLexical.LETTRE_INCONNUE + "]))*";
        private static readonly URL: string = "https://api.datamuse.com/words?sp=";
        private static readonly FLAG: string = "&md=df&max=";
        private static readonly NOMBRE_MAX_REQUETE: number = 10;
        public static readonly MESSAGE_CONTRAINTE_INVALIDE: string = "Erreur : contrainte invalide";
        public static readonly MESSAGE_AUCUN_RESULTAT: string = "Aucun resultat";

        // Obtention de plusieurs mots

        public servirMots(contrainte: string): Promise<Mot[]> {
            const contraintes: string = this.modifierContraintePourAPI(contrainte);

            return this.obtenirMotsSelonContrainte(contraintes, ServiceLexical.NOMBRE_MAX_REQUETE)
                    .then((data: Mot[]) => this.filtrerMots(data));
        }

        private modifierContraintePourAPI(contrainte: string): string {
            let contrainteAPI: string = "";

            for (let i = 0; i < contrainte.length; i++) {
                if (contrainte[i] === ContrainteMot.LETTRE_INCONNUE) {
                    contrainteAPI += "?";
                } else {
                    contrainteAPI += contrainte[i];
                }
            }

            return contrainteAPI;
        }

        // Utilisation de l'API externe

        private obtenirMotsSelonContrainte(contrainte: string, nombreDeMots: number): Promise<Mot[]> {
            if (this.requeteEstValide(contrainte)) {
                const url: string = ServiceLexical.URL + contrainte + ServiceLexical.FLAG + String(nombreDeMots);

                return WebRequest.json<MotAPI[]>(url).then((data: MotAPI[]) => this.convertirMotsAPI(data));
            } else {
                throw Error(ServiceLexical.MESSAGE_CONTRAINTE_INVALIDE);
            }
        }

        private requeteEstValide(contrainte: string): boolean {
            return new RegExp(ServiceLexical.CONTRAINTE_VALIDE, "g").test(contrainte);
            // return true;
        }

        private convertirMotsAPI(data: MotAPI[]): Mot[] {
            const dictionnaire: Mot[] = [];

            for (const motAPI of data) {
                dictionnaire.push(new Mot(motAPI));
            }

            if (dictionnaire.length === 0) {
                throw new Error(ServiceLexical.MESSAGE_AUCUN_RESULTAT);
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

        // Obtention des mots selon la longueur
        public servirMotsSelonLongueur(longueur: string): Promise<Mot[]> {
            const LONGUEUR: number = Number.parseInt(longueur);
            if (!isNaN(LONGUEUR)) {
                return this.servirMots(this.obtenirContrainteLongueur(LONGUEUR));
            } else {
                throw Error("Parametre de la requete invalide");
            }
        }

        private obtenirContrainteLongueur(longueur: number): string {
            let contrainte: string = "";

            for (let i: number = 0 ; i < longueur ; i++) {
                contrainte += ServiceLexical.LETTRE_INCONNUE;
            }

            return contrainte;
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
