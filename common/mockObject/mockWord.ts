
export class Mockword {
   
    private mot: string;
    private definition: string;
    private estVertical: boolean;
    private longeur: number;
    private premierX: number;
    private premierY: number;
    private activer: boolean;

    constructor(estVertical : boolean, longueur: number, premierX: number, premierY: number){
        this.mot = "";
        this.definition = "";
        this.activer = false;
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

    getMot(): string {
        return this.mot;
    }

    getDefinition(): string {
        return this.definition;
    }

    // setters
    setMot(mot: string){
        this.mot = mot;
    }
    setDefinition (definition: string){
        this.definition = definition;
    }


    
    
}