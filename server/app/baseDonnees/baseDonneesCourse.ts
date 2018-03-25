import { Mongoose, Model, Schema, Document } from "mongoose";
import { PisteBD } from "../../../client/src/app/carApp/piste/pisteBD";
import { ErreurRechercheBaseDonnees } from "../exceptions/erreurRechercheBD";
import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";

const URL_BD: string = "mongodb://admin:admin@ds123129.mlab.com:23129/log2990";

@injectable()
export class BaseDonneesCourse {

    private mongoose: Mongoose;
    private schemaPiste: Schema;
    private modelPiste: Model<Document>;

    constructor() {
        this.mongoose = new Mongoose();
        this.schemaPiste = new Schema({
            nom: String,
            description: String,
            points: [{ x: Number, y: Number }],
        });
        this.modelPiste = this.mongoose.model("pistes", this.schemaPiste);
    }

    private async seConnecter(): Promise<void> {
        this.mongoose.connect(URL_BD)
        .then(() => {
            console.log("connecte a la base de donnee");
        }).catch(() => {
            console.log("erreur de connection");
        });
    }

    private get connection(): number {
        return this.mongoose.connection.readyState;
    }

    private chargerModelPiste(): void {
        this.mongoose.connection.model("pistes");
    }

    private async ajouterPisteBidon(): Promise<void> {
        const longueur: number = 100;
        const piste: Document =  new this.modelPiste ({
            nom: "Piste 1",
            description: "Parc au centre de la ville",
            points: [   {x: -longueur, y: -longueur},
                        {x: longueur, y: -longueur},
                        {x: longueur, y: longueur},
                        {x: -longueur , y: longueur}    ]
        });
        await this.modelPiste.create(piste);
    }

    private async modifierUnePiste(nomPiste: string): Promise<void> {
        this.modelPiste.findOne({nom: nomPiste}, (err: ErreurRechercheBaseDonnees, res: Document) => {
            res.toJSON(); // en attendant
        });
    }

    private async supprimerUnePiste(nomPiste: string): Promise<void> {
        this.modelPiste.findOneAndRemove({nom: nomPiste});
    }

    private async obtenirPistes(): Promise<PisteBD[]> {
        const pistes: PisteBD[] = [];
        await this.modelPiste.find((err: ErreurRechercheBaseDonnees, res: Document[]) => {
            for (const document of res) {
                pistes.push(document.toObject());
            }
        });

        return pistes;
    }

    public async requeteDePistes(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (this.connection !== 1) {
            await this.seConnecter();
        }
        this.chargerModelPiste();
        res.send(await this.obtenirPistes());
    }

    public async requeteAjoutDUnePiste(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (this.connection !== 1) {
            await this.seConnecter();
        }
        this.chargerModelPiste();
        res.send(await this.ajouterPisteBidon());
    }

    public async requeteSupprimerPiste(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (this.connection !== 1) {
            await this.seConnecter();
        }
        this.chargerModelPiste();
        res.send(await this.supprimerUnePiste(req.params.nom));
    }
}
