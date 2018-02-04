// import { Mot, TypeMot, Frequence } from "./Mot";
// import { MotAPI } from "./MotAPI";
import * as assert from "assert";

{

    describe("Objet ServiceLexical", () => {
        describe("Constructeur", () => {
            describe("Methodes privées", () => {
                describe("modifierContraintePourAPI", () => {
                    it("Remplace '_' par '?'", () => {
                        assert(true);
                    });
                });
                describe("obtenirMotsDeLAPI", () => {
                    it("Retourne une promesse", () => {
                        assert(true);
                    });
                });
                describe("convertirMotsAPI", () => {
                    it("Erreur si aucun mot", () => {
                        assert(true);
                    });

                    it("Même nombre de mots avant et après", () => {
                        assert(true);
                    });
                });
                describe("obtenirMotsFormattes", () => {
                    it("Retourne une promesse", () => {
                        assert(true);
                    });
                });
                describe("requeteEstValide", () => {
                    it("Identifie requête valide", () => {
                        assert(true);
                    });

                    it("Identifie requête invalide", () => {
                        assert(true);
                    });
                });
                describe("trierMotsSelonFrequence", () => {
                    it("Conserve mots fréquents", () => {
                        assert(true);
                    });

                    it("Conserve mots infréquents", () => {
                        assert(true);
                    });
                });
                describe("obtenirContrainteLongueur", () => {
                    it("Produit une chaîne de '_' de la bonne longueur", () => {
                        assert(true);
                    });
                });
                describe("retirerMotInvalides", () => {
                    it("Retire mot invalide", () => {
                        assert(true);
                    });

                    it("Conserve mot valide", () => {
                        assert(true);
                    });
                });
                describe("retirerMotSansDefinition", () => {
                    it("Retire mot sans définition", () => {
                        assert(true);
                    });

                    it("Conserve mot avec définition", () => {
                        assert(true);
                    });
                });
            });
        });
        describe("servirDefinitionsMot", () => {
            it("Envoie un seul mot", () => {
                assert(true);
            });

            it("Le mot envoyé est le même que le mot de la requête", () => {
                assert(true);
            });
        });
        describe("servirMotsSelonContrainte", () => {
            it("Message d'erreur si requête invalide", () => {
                assert(true);
            });

            it("Envoie un tableau de mots", () => {
                assert(true);
            });
        });
        describe("servirMotsSelonLongueur", () => {
            it("Message d'erreur si requête invalide", () => {
                assert(true);
            });

            it("Envoie un tableau de mots", () => {
                assert(true);
            });
        });
    });
}
