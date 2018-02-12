import { Mot } from "./../../server/app/serviceLexical/Mot";

export class Mockword {
   
    private mot: String;
    private etatAvantEcriture: String;
    private definition: String;
    private estVertical: boolean;
    private longeur: number;
    private premierX: number;
    private premierY: number;
    private indexListe: number;
    private liste: Mot[];

    constructor(estVertical : boolean, longueur: number, premierX: number, premierY: number){
        this.mot = "";
        this.definition = "";
        this.etatAvantEcriture = "";
        this.estVertical = estVertical;
        this.longeur = longueur;
        this.premierX = premierX;
        this.premierY = premierY;
        this.indexListe = 0;
    }
    // getters 
    getVertical(): boolean{
        return this.estVertical;
    }

    getLongueur(): number {
        return this.longeur;
    }

    getPremierX(): number {
        return this.premierX;
    }

    getPremierY(): number {
        return this.premierY;
    }

    getMot(): String {
        return this.mot;
    }

    getDefinition(): String {
        return this.definition;
    }
    getEtatAvantEcriture(): String {
        return this.etatAvantEcriture;
    }



    // setters
    setMot(mot: String){
        this.mot = mot;
    }
    setDefinition (definition: String){
        this.definition = definition;
    }
    setEtatAvantEcriture(etat: String ){
        this.etatAvantEcriture = etat;
    }

    setListeMot(liste: Mot[]){
        this.liste = liste;
    }

    // autre

    public estLieAvecAutreMot(autreMot: Mockword): boolean {
        let coordonneeFixe: number;
        this.getVertical() ? coordonneeFixe = this.getPremierX() : coordonneeFixe = this.getPremierY();
        if (this.getVertical() !== autreMot.getVertical()) {
            let coordMin: number;
            autreMot.getVertical() ? coordMin = autreMot.getPremierX() : coordMin = autreMot.getPremierY();
            const coordMax = coordMin + autreMot.getLongueur() - 1;
            if (coordMin <= coordonneeFixe && coordonneeFixe <= coordMax) {
                return true;
            }
        }

        return false;
    }

    private peutIncrementerIndiceMot() : boolean {
        if(++this.indexListe < this.liste.length) {
            return true;
        }
        return false;
    }

    prochainMot() : void {
        if(this.peutIncrementerIndiceMot){
            this.setMot(this.liste[this.indexListe].mot);
            // random plus tard
            this.setDefinition(this.liste[this.indexListe].definitions[0].definition);
        }
        throw new Error("liste de Mot d'une requete finie");
    }
  
}