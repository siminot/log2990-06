import { Mot } from './Mot';
import { injectable, } from "inversify";
import { Request, Response, NextFunction } from "express";
import * as WebRequest from 'web-request';

module ServiceLexical{

    const URL = "https://api.datamuse.com/words?sp=";
    const FLAG = "&md=df";

    @injectable()
    export class ServiceLexical{

        public constructor() {}

        public servirMots(req: Request, res: Response, next: NextFunction): void {
            this.obtenirMotsSelonContrainte("????").then(reponse => {
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