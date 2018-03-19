import { PisteBD } from "../piste-component/pisteBD";
import { PISTES } from "../piste-component/PisteTest";

export class UtilisateurBD {

    public static get pistes(): PisteBD[] {
        return PISTES;
    }

}
