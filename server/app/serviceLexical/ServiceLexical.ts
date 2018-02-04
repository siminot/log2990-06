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
        public static readonly MESSAGE_REQUETE_INVALIDE: string = "Erreur : requete invalide";
        public static readonly MESSAGE_AUCUN_RESULTAT: string = "Aucun resultat";

        // Utilisation de l'API externe

        private modifierContraintePourAPI(contrainte: string): string {
            let contrainteAPI: string = "";

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < contrainte.length; i++) {
                if (contrainte[i] === ContrainteMot.LETTRE_INCONNUE) {
                    contrainteAPI += "?";
                } else {
                    contrainteAPI += contrainte[i];
                }
            }

            return contrainteAPI;
        }

        private obtenirMotsDeLAPI(contrainte: string, nombreDeMots: number): Promise<Mot[]> {
            const url: string = ServiceLexical.URL + contrainte + ServiceLexical.FLAG + String(nombreDeMots);

            return WebRequest.json<MotAPI[]>(url).then((data: MotAPI[]) => this.convertirMotsAPI(data));
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

        // Intermédiaire entre API et services de mots

        private obtenirMotsFormattes(contrainte: string): Promise<Mot[]> {
            const contrainteAPI: string = this.modifierContraintePourAPI(contrainte);

            return this.obtenirMotsDeLAPI(contrainteAPI, ServiceLexical.NOMBRE_MAX_REQUETE)
                    .then((data: Mot[]) => this.filtrerMots(data));
        }

        // Services de mots

        // Obtention des définitions d'un seul mot
        public servirDefinitionsMot(mot: string, res: Response): void {
            this.obtenirMotsDeLAPI(mot, 1)
                .then((dictionnaire: Mot[]) => res.send(dictionnaire[0]));
        }

        private requeteEstValide(contrainte: string): boolean {
            return new RegExp(ServiceLexical.CONTRAINTE_VALIDE, "g").test(contrainte);
        }

        private trierMotsSelonFrequence(liste: Mot[], frequence: Frequence): Mot[] {
            return liste.filter((mot: Mot) => mot.obtenirFrequence().valueOf() === frequence.valueOf());
        }

        // Obtention des mots selon la fréquence
        public servirMotsSelonContrainte(contrainte: string, frequence: Frequence, res: Response): void {
            if (this.requeteEstValide(contrainte)) {
                this.obtenirMotsFormattes(contrainte)
                    .then((dictionnaire: Mot[]) => res.send(this.trierMotsSelonFrequence(dictionnaire, frequence)));
            } else {
                throw Error(ServiceLexical.MESSAGE_REQUETE_INVALIDE);
            }
        }

        // Obtention des mots selon la longueur
        public servirMotsSelonLongueur(longueur: string, frequence: Frequence, res: Response): void {
            const LONGUEUR: number = Number.parseInt(longueur);
            if (!isNaN(LONGUEUR)) {
                this.obtenirMotsFormattes(this.obtenirContrainteLongueur(LONGUEUR))
                    .then((dictionnaire: Mot[]) => res.send(this.trierMotsSelonFrequence(dictionnaire, frequence)));
            } else {
                throw Error(ServiceLexical.MESSAGE_REQUETE_INVALIDE);
            }
        }

        private obtenirContrainteLongueur(longueur: number): string {
            let contrainte: string = "";

            for (let i = 0 ; i < longueur ; i++) {
                contrainte += ServiceLexical.LETTRE_INCONNUE;
            }

            return contrainte;
        }

        // Filtrer les mots

        private filtrerMots(liste: Mot[]): Mot[] {
            // const listeTriee: Mot[] = this.retirerMotSansDefinition(liste);

            return this.retirerMotsInvalides(this.retirerMotSansDefinition(liste));
        }

        private retirerMotsInvalides(liste: Mot[]): Mot[] {
            return liste.filter((mot: Mot) => !mot.contientCaractereInvalide());
        }

        private retirerMotSansDefinition(liste: Mot[]): Mot[] {
            return liste.filter((mot: Mot) => mot.possedeDefinition());
        }
    }
}

export = moduleServiceLexical;
