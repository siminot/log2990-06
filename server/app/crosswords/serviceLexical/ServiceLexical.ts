import { Mot } from './Mot';
import { injectable, } from "inversify";
import { Request, Response, NextFunction } from "express";
//import { Message } from "../../../../common/communication/message";

import * as WebRequest from 'web-request';

module ServiceLexical{

    const URL = "https://api.datamuse.com/words?sp=";
    const FLAG = "&md=df";

    @injectable()
    export class ServiceLexical{

        public constructor() {}

        public messageServiceLexical(req: Request, res: Response, next: NextFunction): void {
            //const message: Message = new Message();
            //message.title = "Service: ";
            this.obtenirMotsSelonContrainte("f???").then(reponse => {
                res.send(reponse);
            });
        }    
    
        public obtenirMotsSelonContrainte(contrainte : string) : Promise<Mot[]> {
            let url = URL + contrainte + FLAG;
            let promesse = WebRequest.json<any>(url);
            let mots: Mot[];
            return promesse.then((data) => this.importerJSON(data));
            //return this.importerJSON(data);
        }
    
        private importerJSON(data : any) : Mot[] {
            let dictionnaire : Mot[] = [];
            
            //Parcourir le JSON et ajouter les mots
            // let donnees = JSON.parse(data);
            for(let objet of data){
                let mot = new Mot(objet.word, objet.defs, objet.tags[0])
                if(mot.possedeDefinition())
                    dictionnaire.push(mot);
            }
            
            return dictionnaire;
        }
    
        public obtenirDefinitionsMot(mot : string) : Mot {
            let motTrouve = this.obtenirMotsSelonContrainte(mot)[0];

            if(motTrouve === undefined)
                throw Error("Mot non trouve");
            else
                return motTrouve;
        }
    }

}

export = ServiceLexical;