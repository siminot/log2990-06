import { PisteBD } from "../piste/pisteBD";
import { PISTES } from "../piste/pisteTest";

export class UtilisateurBD {

    public static get pistes(): PisteBD[] {
        return PISTES;
    }

}
