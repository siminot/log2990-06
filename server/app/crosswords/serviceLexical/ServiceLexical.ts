import { Mot, Frequence } from './Mot';
import { injectable, } from "inversify";
import { Response } from "express";
import * as WebRequest from 'web-request';
import { ContrainteMot } from './ContrainteMot';

module ServiceLexical{

    const URL = "https://api.datamuse.com/words?sp=";
    const FLAG = "&md=df&max=1000";

    @injectable()
    export class ServiceLexical{

        public constructor() {}

        public servirMots(contrainte : string) : Promise<Mot[]> {
            let contraintes : string = this.modifierContraintePourAPI(contrainte);

            if(this.requeteEstValide(contrainte))
                return this.obtenirMotsSelonContrainte(contraintes);
            else
                throw Error("Format de la requete invalide");
        }    
    
        private modifierContraintePourAPI(contrainte : string ) : string {
            let contrainteAPI : string = "";

            for(let i = 0 ; i < contrainte.length ; i++){
                if(contrainte[i] == ContrainteMot.LETTRE_INCONNUE)
                    contrainteAPI += "?"; 
                else
                    contrainteAPI += contrainte[i];
            }

            return contrainteAPI;
        }

        private obtenirMotsSelonContrainte(contrainte : string) : Promise<Mot[]> {
            let url = URL + contrainte + FLAG;
            return WebRequest.json<any>(url).then((data) => this.retirerMotsSansDefinition(data));
        }
    
        private retirerMotsSansDefinition(data : any) : Mot[] {
            let dictionnaire : Mot[] = [];
            
            for(let objet of data){
                let mot = new Mot(objet.word, objet.defs, objet.tags[0])
                if(mot.possedeDefinition())
                    dictionnaire.push(mot);
            }
            
            return dictionnaire;
        }

        private trierMotsSelonFrequence(liste : Mot[], frequence : Frequence) : Mot[] {
            return liste.filter(mot => mot.obtenirFrequence().valueOf() == frequence.valueOf());
        }

        public servirMotsSelonFrequence(contrainte : string, frequence : Frequence, res : Response) : void {
            this.servirMots(contrainte)
                .then(dictionnaire => res.send(this.trierMotsSelonFrequence(dictionnaire, frequence)));
        }

        public obtenirDefinitionsMot(mot : string, res : Response) : void {
            this.obtenirMotsSelonContrainte(mot)
                .then(dictionnaire => res.send(dictionnaire[0]))
        }

        private requeteEstValide(contrainte : string) : boolean {
            //A completer
            return true;
        }
    }
}

export = ServiceLexical;
