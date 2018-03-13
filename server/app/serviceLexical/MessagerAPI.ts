import "reflect-metadata";
import * as WebRequest from "web-request";

import { MotAPI } from "./MotAPI";

const LETTRE_INCONNUE: string = "_";
const LETTRE_INCONNUE_API: string = "?";
const URL: string = "https://api.datamuse.com/words?sp=";
const FLAG: string = "&md=df&max=";
const MESSAGE_REQUETE_INVALIDE: string = "Erreur : requete invalide";

export class MessagerAPI {

    public static async obtenirMots(contrainte: string, nombreDeMots: number): Promise<MotAPI[]> {
        const CONTRAINTE_API: string = MessagerAPI.adapterContrainte(contrainte);
        const URL_API: string = URL + CONTRAINTE_API + FLAG + String(nombreDeMots);
        const mots: Promise<MotAPI[]> = WebRequest.json<MotAPI[]>(URL_API);

        return mots;
    }

    private static requeteEstValide(contrainte: string): boolean {
        for (let i: number = 0; i < contrainte.length; i++) {
            if (!contrainte.toLowerCase().charAt(i).match("[a-z" + LETTRE_INCONNUE + "]")) {
                return false;
            }
        }

        return true;
    }

    private static adapterContrainte(contrainte: string): string {
        if (MessagerAPI.requeteEstValide(contrainte)) {

            let contrainteAPI: string = "";

            for (const char of contrainte) {
                if (char === LETTRE_INCONNUE) {
                    contrainteAPI += LETTRE_INCONNUE_API;
                } else {
                    contrainteAPI += char;
                }
            }

            return contrainteAPI;
        } else {
            throw new Error(MESSAGE_REQUETE_INVALIDE);
        }
    }
}
