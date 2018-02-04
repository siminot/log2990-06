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
        private static readonly LETTRE_INCONNUE_API: string = "?";
        private static readonly URL: string = "https://api.datamuse.com/words?sp=";
        private static readonly FLAG: string = "&md=df&max=";
        private static readonly NOMBRE_MAX_REQUETE: number = 10;
        private static readonly MESSAGE_REQUETE_INVALIDE: string = "Erreur : requete invalide";
        private static readonly MESSAGE_AUCUN_RESULTAT: string = "Aucun resultat";

        // Utilisation de l'API externe

        private modifierContraintePourAPI(contrainte: string): string {
            let contrainteAPI: string = "";

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < contrainte.length; i++) {
                if (contrainte[i] === ContrainteMot.LETTRE_INCONNUE) {
                    contrainteAPI += ServiceLexical.LETTRE_INCONNUE_API;
                } else {
                    contrainteAPI += contrainte[i];
                }
            }

            return contrainteAPI;
        }

        private obtenirMotsDeLAPI(contrainte: string, nombreDeMots: number): Promise<Mot[]> {
            const url: string = ServiceLexical.URL + contrainte + ServiceLexical.FLAG + String(nombreDeMots);

            return WebRequest.json<MotAPI[]>(url)
                .then((data: MotAPI[]) => this.convertirMotsAPI(data));
        }

        private convertirMotsAPI(data: MotAPI[]): Mot[] {
            const dictionnaire: Mot[] = [];

            for (const motAPI of data) {
                dictionnaire.push(new Mot(motAPI));
            }

            return dictionnaire;
        }

        // Intermédiaire entre API et services de mots

        private obtenirMotsFormattes(contrainte: string): Promise<Mot[]> {
            const contrainteAPI: string = this.modifierContraintePourAPI(contrainte);

            return this.obtenirMotsDeLAPI(contrainteAPI, ServiceLexical.NOMBRE_MAX_REQUETE)
                .then((data: Mot[]) => this.filtrerMots(data))
                .catch((erreur: Error) => null);
        }

        // Services de mots

        // Obtention des définitions d'un seul mot
        public servirDefinitionsMot(mot: string, res: Response): void {
            if (this.estUnMotValide(mot)) {
                this.obtenirMotsDeLAPI(mot, 1)
                    .then((dictionnaire: Mot[]) => {
                        if (dictionnaire[0].definitions !== null) {
                            res.send(dictionnaire[0]);
                        } else {
                            res.send(ServiceLexical.MESSAGE_AUCUN_RESULTAT);
                        }
                    });
            } else {
                throw new Error(ServiceLexical.MESSAGE_REQUETE_INVALIDE);
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

        private requeteEstValide(contrainte: string): boolean {
            for (let i = 0; i < contrainte.length; i++) {
                if (!contrainte.toLowerCase().charAt(i).match("[a-z" + ServiceLexical.LETTRE_INCONNUE + "]")) {
                    return false;
                }
            }

            return true;
        }

        private trierMotsSelonFrequence(liste: Mot[], frequence: Frequence): Mot[] {
            return liste.filter((mot: Mot) => mot.obtenirFrequence().valueOf() === frequence.valueOf());
        }

        // Obtention des mots selon la fréquence
        public servirMotsSelonContrainte(contrainte: string, frequence: Frequence, res: Response): void {
            if (this.requeteEstValide(contrainte)) {
                this.obtenirMotsFormattes(contrainte)
                    .then((dictionnaire: Mot[]) => {
                        if (dictionnaire.length > 0) {
                            res.send(this.trierMotsSelonFrequence(dictionnaire, frequence));
                        } else {
                            res.send(ServiceLexical.MESSAGE_AUCUN_RESULTAT);
                        }
                    });
            } else {
                throw new Error(ServiceLexical.MESSAGE_REQUETE_INVALIDE);
            }
        }

        // Obtention des mots selon la longueur
        public servirMotsSelonLongueur(longueur: string, frequence: Frequence, res: Response): void {
            const LONGUEUR: number = Number.parseInt(longueur);
            if (!isNaN(LONGUEUR)) {
                this.obtenirMotsFormattes(this.obtenirContrainteLongueur(LONGUEUR))
                    .then((dictionnaire: Mot[]) => {
                        if (dictionnaire.length > 0) {
                            res.send(this.trierMotsSelonFrequence(dictionnaire, frequence));
                        } else {
                            res.send(ServiceLexical.MESSAGE_AUCUN_RESULTAT);
                        }
                    });
            } else {
                throw new Error(ServiceLexical.MESSAGE_REQUETE_INVALIDE);
            }
        }

        private obtenirContrainteLongueur(longueur: number): string {
            let contrainte: string = "";

            for (let i = 0; i < longueur; i++) {
                contrainte += ServiceLexical.LETTRE_INCONNUE;
            }

            return contrainte;
        }

        // Filtrer les mots

        private filtrerMots(liste: Mot[]): Mot[] {
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
