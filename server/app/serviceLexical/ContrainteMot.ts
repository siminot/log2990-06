export class ContrainteMot {
    public static readonly LETTRE_INCONNUE: string = "_";

    private contraintes: Map<number, string>;

    public constructor(private longueurMot: number) {
        if (longueurMot < 1) {
            // throw RangeError("Longueur du mot invalide : " + longueurMot + " doit etre > 0");
            throw new Error("Erreur");
        }
        this.contraintes = new Map;
    }

    public setContrainte(contrainte: string): boolean {
        if (this.URLestValide(contrainte)) {
            this.longueurMot = contrainte.length;
            this.contraintes.clear();

            for (let i = 0; i < contrainte.length; i++) {
                if (!(/[a-zA-Z]/.test(contrainte[i])) && !(contrainte[i] === ContrainteMot.LETTRE_INCONNUE)) {
                    this.ajouterContrainte(contrainte[i], i);
                }
            }

            return true;
        } else {
            return false;
        }
    }

    private URLestValide(contrainte: string): boolean {
        for (let i = 0; i < contrainte.length; i++) {
            if (!(/^[a-zA-Z]/.test(contrainte[i])) && !(contrainte[i] === ContrainteMot.LETTRE_INCONNUE)) {
                return false;
            }
        }

        return true;
    }

    public ajouterContrainte(lettre: string, position: number): void {
        if (lettre.length !== 1) {
            throw RangeError("La contrainte doit être de longueur 1 et celle reçue est de longueur " + lettre.length);
        }

        if (/^[a-zA-Z]/.test(lettre)) {
            throw RangeError(lettre + " n'est pas une lettre");
        }

        if (position < 1 || position > this.longueurMot) {
            throw RangeError("La position doit être entre 0 et " + this.longueurMot + ". Position demandée : " + position);
        }

        if (this.contraintes.has(position)) {
            throw Error("Une contrainte est déjà présente à cette position : " + position + " " + this.contraintes[position]);
        }

        this.contraintes.set(position, lettre.toUpperCase());
    }

    public obtenirURL(): string {
        const url: string[] = [];

        url.fill(ContrainteMot.LETTRE_INCONNUE, 0, this.longueurMot - 1);

        for (const cle of this.contraintes.keys()) {
            url[cle] = this.contraintes[cle];
        }

        let urlString: string;

        for (const contrainte of url) {
            urlString += contrainte;
        }

        return urlString;
    }
}
