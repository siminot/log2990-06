import { Mot } from './Mot';
import { injectable, } from "inversify";
import { Request, Response, NextFunction } from "express";
import * as WebRequest from 'web-request';

module ServiceLexical{

    const URL = "https://api.datamuse.com/words?sp=";
    const FLAG = "&md=df&max=1000";

    @injectable()
    export class ServiceLexical{

        public constructor() {}

        public servirMots(req: Request, res: Response, next: NextFunction): void {
            let contraintes : string = "";

            for(let i = 0 ; i < req.params.contrainte.length ; i++){
                if(req.params.contrainte[i] == "_")
                    contraintes += "?";
                else
                    contraintes += req.params.contrainte[i];
            }

            this.obtenirMotsSelonContrainte(contraintes).then(reponse => {
                res.send(reponse);
            });
        }    
    
        public obtenirMotsSelonContrainte(contrainte : string) : Promise<Mot[]> {
            let url = URL + contrainte + FLAG;
            let promesse = WebRequest.json<any>(url);
            return promesse.then((data) => this.trierMotsJSON(data));
        }
    
        private trierMotsJSON(data : any) : Mot[] {
            let dictionnaire : Mot[] = [];
            
            // Parcourir le JSON et ajouter les mots
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