import { Mot } from './Mot';
import * as WebRequest from 'web-request';

class ServiceLexical{

    public constructor() {

    }


    public async obtenirMotsSelonContrainte(contrainte : string){
        let url = "https://api.datamuse.com/words?sp=t??k";
        let data = await WebRequest.json<any>(url);

    }

    private retirerMotsSansDefinition(mots : Array<Mot>) : void {

    }

    public obtenirDefinitionsMot(mot : string) : Mot {


        if("mot inexsistant")
            throw Error("Mot inexistant ou sans definition");

        return null;
    }

}