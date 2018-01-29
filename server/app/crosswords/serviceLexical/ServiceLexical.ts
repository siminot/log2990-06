import { Mot } from './Mot';
import { injectable, } from "inversify";
import { Request, Response, NextFunction } from "express";
import { Message } from "../../../../common/communication/message";

//import * as WebRequest from 'web-request';

module ServiceLexical{

    @injectable()
    export class ServiceLexical{

        public constructor() {}

        public messageServiceLexical(req: Request, res: Response, next: NextFunction): void {
            const message: Message = new Message();
            message.title = "Service";
            message.body = "Lexical";
            res.send(JSON.stringify(message));
        }    
    
        public obtenirMotsSelonContrainte(contrainte : string) : Array<Mot> {
            let url = "https://api.datamuse.com/words?sp=";
            url += contrainte + "&md=df";
            let data;//= WebRequest.json<any>(url);
            return this.importerJSON(data);
        }
    
        private importerJSON(data : any) : Array<Mot> {
            let dictionnaire : Array<Mot>;
            
            //Parcourir le JSON et ajouter les mots
            let donnees = JSON.parse(data);
            for(let objet of donnees){
                let mot = new Mot(objet.word, objet.defs, objet.tags[0])
                if(mot.possedeDefinition())
                    dictionnaire.fill(mot);
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