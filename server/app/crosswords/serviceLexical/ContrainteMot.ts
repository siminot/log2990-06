//import { Difficulte } from "./Difficulte";

export class ContrainteMot {
	private contraintes: Map<number, string>;

	public constructor(private longueurMot: number/*, private difficulte: Difficulte*/) { 
		if(longueurMot < 1)
			throw RangeError("Longueur du mot invalide : " + longueurMot + " doit etre > 0");
		this.contraintes.clear();
	}

    public ajouterContrainte(lettre: string, position: number) : void {
		if(lettre.length != 1)
			throw RangeError("La contrainte doit être de longueur 1 et celle reçue est de longueur " + lettre.length);

		if(/^[a-zA-Z]/.test(lettre))
			throw RangeError(lettre + " n'est pas une lettre");

		if(position < 1 || position > this.longueurMot)
			throw RangeError("La position doit être entre 0 et " + this.longueurMot + ". Position demandée : " + position);

		if(this.contraintes.has(position))
			throw Error("Une contrainte est déjà présente à cette position : " 
						+ position + " " + this.contraintes[position])

		this.contraintes.set(position, lettre.toUpperCase());
	}

	public obtenirURLAPI() : string {
		let url : string[];

		url.fill("?", 0, this.longueurMot - 1);
		
		for(let cle of this.contraintes.keys()){
			url[cle] = this.contraintes[cle];
		}

		let urlString : string;

		for(let contrainte of url)
			urlString += contrainte;

		
		return urlString;
	}
}