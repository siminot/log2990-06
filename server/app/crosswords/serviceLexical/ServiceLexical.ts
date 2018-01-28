import { Mot } from './Mot';
import { injectable, } from "inversify";
import { Request, Response, NextFunction } from "express";
import { Message } from "../../../../common/communication/message";

//import * as WebRequest from 'web-request';

module ServiceLexical{

    @injectable()
    export class ServiceLexical{

        public constructor() {}

        public helloWorld(req: Request, res: Response, next: NextFunction): void {
            const message: Message = new Message();
            message.title = "Service";
            message.body = "Lexical";
            res.send(JSON.stringify(message));
        }    
    
        public async obtenirMotsSelonContrainte(contrainte : string){
            //let url = "https://api.datamuse.com/words?sp=t??k";
            //let data = await WebRequest.json<any>(url);
            this.retirerMotsSansDefinition(null);
        }
    
        private retirerMotsSansDefinition(mots : Array<Mot>) : void {
    
        }
    
        public obtenirDefinitionsMot(mot : string) : Mot {
    
    
            if("mot inexsistant")
                throw Error("Mot inexistant ou sans definition");
    
            return null;
        }
    }

}

export = ServiceLexical;