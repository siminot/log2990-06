import { injectable, } from "inversify";
import { Response } from "express";
import * as WebRequest from "web-request";

import { Mot, Frequence } from "./Mot";
import { MotAPI } from "./MotAPI";

const LETTRE_INCONNUE = "_";
const LETTRE_INCONNUE_API = "?";
const URL = "https://api.datamuse.com/words?sp=";
const FLAG = "&md=df&max=";
const NOMBRE_MAX_REQUETE = 1000;
const MESSAGE_REQUETE_INVALIDE = "Erreur : requete invalide";
const MESSAGE_AUCUN_RESULTAT = "Aucun resultat";
const MESSAGE_ERREUR_API_EXTERNE = "Erreur de l'API externe";

module moduleServiceLexical {

    @injectable()
    export class ServiceLexical {

        // Utilisation de l'API externe

        private modifierContraintePourAPI(contrainte: string): string {
            let contrainteAPI = "";

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < contrainte.length; i++) {
                if (contrainte[i] === LETTRE_INCONNUE) {
                    contrainteAPI += LETTRE_INCONNUE_API;
                } else {
                    contrainteAPI += contrainte[i];
                }
            }

            return contrainteAPI;
        }

        private async obtenirMotsDeLAPI(contrainte: string, nombreDeMots: number): Promise<Mot[]> {
            const URL_API: string = URL + contrainte + FLAG + String(nombreDeMots);

            return WebRequest.json<MotAPI[]>(URL_API)
                .then((data: MotAPI[]) => this.convertirMotsAPI(data))
                .catch(() => { throw Error(MESSAGE_ERREUR_API_EXTERNE); });
        }

        private convertirMotsAPI(data: MotAPI[]): Mot[] {
            const dictionnaire: Mot[] = [];

            for (const MOT_API of data) {
                dictionnaire.push(new Mot(MOT_API));
            }

            return dictionnaire;
        }

        // Intermédiaire entre API et services de mots

        private async obtenirMotsFormattes(contrainte: string): Promise<Mot[]> {
            const CONTRAINTE_API: string = this.modifierContraintePourAPI(contrainte);

            return this.obtenirMotsDeLAPI(CONTRAINTE_API, NOMBRE_MAX_REQUETE)
                .then((data: Mot[]) => this.filtrerMots(data))
                .catch((erreur: Error) => { throw Error(MESSAGE_ERREUR_API_EXTERNE); });
        }

        // Services de mots

        // Obtention des définitions d'un seul mot
        public servirDefinitionsMot(mot: string, res: Response): void {
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

        private requeteEstValide(contrainte: string): boolean {
            for (let i = 0; i < contrainte.length; i++) {
                if (!contrainte.toLowerCase().charAt(i).match("[a-z" + LETTRE_INCONNUE + "]")) {
                    return false;
                }
            }

            return true;
        }

        private trierMotsSelonFrequence(liste: Mot[], frequence: Frequence): Mot[] {
            return liste.filter((mot: Mot) => mot.obtenirFrequence().valueOf() === frequence.valueOf());
        }

        // Obtention des mots selon la contrainte
        public servirMotsSelonContrainte(contrainte: string, frequence: Frequence, res: Response): void {
            if (this.requeteEstValide(contrainte)) {
                this.obtenirMotsFormattes(contrainte)
                    .then((dictionnaire: Mot[]) => {
                        this.renvoyerMots(this.trierMotsSelonFrequence(dictionnaire, frequence), res);
                    })
                    .catch(() => res.send(new Error(MESSAGE_ERREUR_API_EXTERNE)));
            } else {
                throw new Error(MESSAGE_REQUETE_INVALIDE);
            }
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
        }

        private renvoyerMots(dictionnaire: Mot[], res: Response): void {
            if (dictionnaire.length > 0) {
                res.send(dictionnaire);
            } else {
                res.send(MESSAGE_AUCUN_RESULTAT);
            }
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
