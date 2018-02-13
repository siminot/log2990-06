export class Mockword {
   
    private mot: String;
    private definition: String;
    private estVertical: boolean;
    private longeur: number;
    private premierX: number;
    private premierY: number;
    private estTraite: boolean;

    constructor(estVertical : boolean, longueur: number, premierX: number, premierY: number){
        this.mot = "";
        this.definition = "";
        this.estVertical = estVertical;
        this.longeur = longueur;
        this.premierX = premierX;
        this.premierY = premierY;
        this.estTraite = false;
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

    getEstTraite(){
        return this.estTraite;
    }


    // setters
    setMot(mot: String){
        this.mot = mot;
    }
    setDefinition (definition: String){
        this.definition = definition;
    }

    setEstTraite(etat: boolean){
        this.estTraite = etat;
    }

    // autre

    public estLieAvecAutreMot(autreMot: Mockword): boolean {
        
        if (this.getVertical() !== autreMot.getVertical()) {

            let coordonneeVariableMin: number;
            let coordonneeVariableMax: number;
            let coordAutre: number;

            this.getVertical() ? coordonneeVariableMin = this.getPremierY() : coordonneeVariableMin = this.getPremierX();
            coordonneeVariableMax = coordonneeVariableMin + this.getLongueur() - 1;
            this.getVertical() ? coordAutre = this.getPremierY() : coordAutre = this.getPremierX();

            if(coordonneeVariableMin <= coordAutre && coordAutre <= coordonneeVariableMax) {
                
                let coordonneeFixe: number;
                let coordMinAutre: number;
                let coordMaxAutre: number;

                this.getVertical() ? coordonneeFixe = this.getPremierX() : coordonneeFixe = this.getPremierY();
                autreMot.getVertical() ? coordMinAutre = autreMot.getPremierY() : coordMinAutre = autreMot.getPremierX();
                coordMaxAutre = coordMinAutre + autreMot.getLongueur() - 1;

                if (coordMinAutre <= coordonneeFixe && coordonneeFixe <= coordMaxAutre) {
                    return true;
                }
            }
        }

        return false;
    }

    public getImportance(ancienMot: Mockword): number {
        let i = 0;
        for(let char of this.mot) {
            if(char !== "_") {
                i++;
            }
        }

        return i + this.mot.length;
    }
  
}