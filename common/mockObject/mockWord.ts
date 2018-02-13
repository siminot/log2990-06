const PRIORITEADJACENCE = 20;

export class Mockword {
   
    private mot: String;
    private etatAvantEcriture: String;
    private definition: String;
    private estVertical: boolean;
    private longeur: number;
    private premierX: number;
    private premierY: number;
    private estTraite: boolean;

    constructor(estVertical : boolean, longueur: number, premierX: number, premierY: number){
        this.mot = "";
        this.definition = "";
        this.etatAvantEcriture = "";
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
    getEtatAvantEcriture(): String {
        return this.etatAvantEcriture;
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
    
    setEtatAvantEcriture(etat: String ){
        this.etatAvantEcriture = etat;
    }

    setEstTraite(etat: boolean){
        this.estTraite = etat;
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

    public getImportance(ancienMot: Mockword): number {
        let i = 0;
        for(let char of this.mot) {
            if(char !== "_") {
                i++;
            }
        }
        if(this.estLieAvecAutreMot(ancienMot)){
            i+=PRIORITEADJACENCE // priorite a
        }
        return i + this.mot.length;
    }
  
}