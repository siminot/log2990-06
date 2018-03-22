import { IPaquetPartie } from "../../../../../common/communication/Ipaquet";
import { Mot} from "./mot";

export class PaquetPartie implements IPaquetPartie {

    public nomPartie: string;
    public nomJoeurs: Array<string>;
    public grilleDeJeu: Mot[];

}