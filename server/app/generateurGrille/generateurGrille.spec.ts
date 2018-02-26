import { GenerateurGrille } from "./generateurGrille";
import * as assert from "assert";

const genTest: GenerateurGrille = new GenerateurGrille();

describe("Tests GenerateurGrille", () => {

    describe("- tests du constructeur", () => {

        it("bon fonctionnement du constructeur", (done) => {
            assert.ok(new GenerateurGrille);
            done();
        });

        const generateurGrille = new GenerateurGrille();

        it("le constructeur cree bien des options", (done) => {
            assert.ok(generateurGrille["optionsPartie"]);
            done();
        });

        it("requeteGrille fonctionne", (done) => {
            (req: Request, res: Response, next: NextFunction) => {
                 generateurGrille.requeteDeGrille(req, res, next);
            }
        });




    });

});
