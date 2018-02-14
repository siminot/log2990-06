import "reflect-metadata";
import * as WebRequest from "web-request";

import { MotAPI } from "./MotAPI";

const LETTRE_INCONNUE = "_";
const LETTRE_INCONNUE_API = "?";
const URL = "https://api.datamuse.com/words?sp=";
const FLAG = "&md=df&max=";
const MESSAGE_REQUETE_INVALIDE = "Erreur : requete invalide";

export class MessagerAPI {

    public async obtenirMotsDeLAPI(contrainte: string, nombreDeMots: number): Promise<MotAPI[]> {
        const CONTRAINTE_API = this.modifierContraintePourAPI(contrainte);
        const URL_API: string = URL + CONTRAINTE_API + FLAG + String(nombreDeMots);
        const mots = WebRequest.json<MotAPI[]>(URL_API);

        return mots;
    }

    private requeteEstValide(contrainte: string): boolean {
        for (let i = 0; i < contrainte.length; i++) {
            if (!contrainte.toLowerCase().charAt(i).match("[a-z" + LETTRE_INCONNUE + "]")) {
                return false;
            }
        }

        return true;
    }

    private modifierContraintePourAPI(contrainte: string): string {
        if (this.requeteEstValide(contrainte)) {

            let contrainteAPI = "";

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
