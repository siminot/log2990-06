
export class Mockword {
   
    private mot: String;
    private definition: String;
    private estVertical: boolean;
    private longeur: number;
    private premierX: number;
    private premierY: number;
    // private activer: boolean;

    constructor(estVertical : boolean, longueur: number, premierX: number, premierY: number){
        this.mot = "";
        this.definition = "";
        // this.activer = false;
        this.estVertical = estVertical;
        this.longeur = longueur;
        this.premierX = premierX;
        this.premierY = premierY;
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

    // setters
    setMot(mot: String){
        this.mot = mot;
    }
    setDefinition (definition: String){
        this.definition = definition;
    }
  
}