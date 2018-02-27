import { VIDE, NOIR } from "./constantes";
import { MotGenerationGrille } from "./motGenerateurGrille";

export class GenerateurListeMots {

    private listeMot: Array<MotGenerationGrille> = new Array<MotGenerationGrille>();

    public donnerUneListe(uneGrille: Array<Array<string>>): Array<MotGenerationGrille> {
        this.listeMot = new Array<MotGenerationGrille>();
        this.genererListeMot(uneGrille);
        this.nettoyerMots();

        return this.listeMot;
    }

    // Sort la liste en ordre decroissant et retire les mots de 1 lettres
    private nettoyerMots(): void {
        this.listeMot.sort((n1: MotGenerationGrille, n2: MotGenerationGrille) => n2.getLongueur() - n1.getLongueur());
        while (this.listeMot[this.listeMot.length - 1].getLongueur() === 1) {
            this.listeMot.pop();
        }
    }

    private genererMot(x: number, y: number, estVertical: boolean, uneGrille: Array<Array<string>>): MotGenerationGrille {

        if (x < 0 || y < 0) {
            throw new Error("Entree negative interdite");
        }

        let longMot: number = 0;
        let mot: string = "";
        for (let i: number = estVertical ? y : x; i < uneGrille.length; i++) {
            if (uneGrille[i][x] !== NOIR && estVertical) {
                longMot++;
                mot += "_";
            } else if (uneGrille[y][i] !== NOIR && !estVertical) {
                longMot++;
                mot += "_";
            } else {
                break;
            }
        }
        const nouveauMot: MotGenerationGrille = new MotGenerationGrille(estVertical, longMot, x, y);
        nouveauMot.setMot(mot);

        return nouveauMot;
    }

    private genererListeMot(uneGrille: Array<Array<string>>): number {

        let ctrMots: number = 0;
        for (let i: number = 0; i < uneGrille.length; i++) {
            for (let j: number = 0; j < uneGrille.length; j++) {
                if (uneGrille[i][j] === VIDE) {
                    if (j === 0) {
                        this.listeMot.push(this.genererMot(j, i, false, uneGrille));
                        ctrMots++;
                    } else if (uneGrille[i][j - 1] === NOIR) {   // Car je ne veux pas acceder a un espace memoire a [-1]
                         this.listeMot.push(this.genererMot(j, i, false, uneGrille));
                         ctrMots++;
                    }
                    if (i === 0) {
                        this.listeMot.push(this.genererMot(j, i, true, uneGrille));
                        ctrMots++;
                    } else if (uneGrille[i - 1][j] === NOIR) {   // Car je ne veux pas acceder a un espace memoire a [-1]
                        this.listeMot.push(this.genererMot(j, i, true, uneGrille));
                        ctrMots++;
                    }
                }
            }
        }
        this.nettoyerMots();

        return ctrMots;
    }

}
