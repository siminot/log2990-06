import { Mongoose, Model, Schema, Document } from "mongoose";
import { PisteBD } from "../../../client/src/app/carApp/piste/IPisteBD";
import { ErreurRechercheBaseDonnees } from "../exceptions/erreurRechercheBD";
import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { ErreurSupressionBaseDonnees } from "../exceptions/erreurSupressionBD";
import { ErreurModificationBaseDonnees } from "../exceptions/erreurModificationBD";
import { ErreurConnectionBD } from "../exceptions/erreurConnectionBD";

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
            infos: String,
            tempsTours: [{ nom: String, min: Number, sec: Number, milliSec: Number }]
        });
        this.modelPiste = this.mongoose.model("pistes", this.schemaPiste);
    }

    private async seConnecter(): Promise<void> {
        await this.mongoose.connect(URL_BD);
    }

    private get estConnecte(): boolean {
        return this.mongoose.connection.readyState === 1;
    }

    private async assurerConnection(): Promise<void> {
        if (!this.estConnecte) {
            await this.seConnecter();
        }
    }

    private async ajouterPiste(pisteJson: {}): Promise<void> {
        const piste: Document =  new this.modelPiste(pisteJson);
        await this.modelPiste.create(piste);
    }

    private async modifierUnePiste(identifiant: string, piste: PisteBD): Promise<void> {
        this.modelPiste.findByIdAndUpdate(identifiant, { nom: piste.nom, description: piste.description, points: piste.points,
                                                         infos: piste.infos, tempsTour: piste.tempsTours })
            .exec().catch( () => {
                throw new ErreurModificationBaseDonnees;
            });
    }

    private async supprimerUnePiste(identifiant: string): Promise<void> {
        this.modelPiste.findByIdAndRemove(identifiant).exec()
            .catch(() => {
                throw new ErreurSupressionBaseDonnees();
        });
    }

    private async obtenirPistes(): Promise<PisteBD[]> {
        const pistes: PisteBD[] = [];
        await this.modelPiste.find()
            .then((res: Document[]) => {
                for (const document of res) {
                    pistes.push(document.toObject());
                }
            })
            .catch( () => { throw new ErreurRechercheBaseDonnees; });

        return pistes;
    }

    private async obtenirUnePiste(identifiant: string): Promise<PisteBD> {
        let piste: PisteBD = null;
        await this.modelPiste.findById(identifiant)
            .then((res: Document) => { piste = res.toObject(); })
            .catch(() => { throw new ErreurRechercheBaseDonnees; });

        return piste;
    }

    public async requeteDePistes(req: Request, res: Response, next: NextFunction): Promise<void> {
        this.assurerConnection().catch(() => {
            throw new ErreurConnectionBD();
        });
        res.send(await this.obtenirPistes());
    }

    public async requeteUnePiste(req: Request, res: Response, next: NextFunction): Promise<void> {
        this.assurerConnection().catch(() => { throw new ErreurConnectionBD(); });
        res.send(await this.obtenirUnePiste(req.params.id));
    }

    public async requeteAjoutDUnePiste(req: Request, res: Response, next: NextFunction): Promise<void> {
        this.assurerConnection().catch(() => {
            throw new ErreurConnectionBD();
        });
        res.send(await this.ajouterPiste(req.body));
    }

    public async requeteSupprimerPiste(req: Request, res: Response, next: NextFunction): Promise<void> {
        this.assurerConnection().catch(() => {
            throw new ErreurConnectionBD();
        });
        res.send(await this.supprimerUnePiste(req.params.id));
    }

    public async requeteModifierPiste(req: Request, res: Response, next: NextFunction): Promise<void> {
        this.assurerConnection().catch(() => {
            throw new ErreurConnectionBD();
        });
        res.send(await this.modifierUnePiste(req.params.id, req.body));
    }
}
