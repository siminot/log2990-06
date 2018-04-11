import { TempsAffichage } from "../vue-tete-haute/vue-tete-haute/tempsAffichage";
import { ResultatJoueur } from "./resultatJoueur";

// tslint:disable: no-magic-numbers

const temps1: TempsAffichage = new TempsAffichage();
temps1.tempsAffichable = 60000;

const temps2: TempsAffichage = new TempsAffichage();
temps2.tempsAffichable = 40000;

const temps3: TempsAffichage = new TempsAffichage();
temps3.tempsAffichable = 30000;

const temps4: TempsAffichage = new TempsAffichage();
temps4.tempsAffichable = 50000;

const tempsfinal1: TempsAffichage = new TempsAffichage();
tempsfinal1.tempsAffichable = 300;

const tempsfinal2: TempsAffichage = new TempsAffichage();
tempsfinal2.tempsAffichable = 120000;

const tempsfinal3: TempsAffichage = new TempsAffichage();
tempsfinal3.tempsAffichable = 90000;

const tempsfinal4: TempsAffichage = new TempsAffichage();
tempsfinal4.tempsAffichable = 150000;

const bob: ResultatJoueur = new ResultatJoueur("bob", true, new Array<TempsAffichage>(temps1, temps1, temps1), tempsfinal1);
const ai1: ResultatJoueur = new ResultatJoueur("ai1", false, new Array<TempsAffichage>(temps2, temps2, temps2), tempsfinal2);
const ai2: ResultatJoueur = new ResultatJoueur("ai2", false, new Array<TempsAffichage>(temps3, temps3, temps3), tempsfinal3);
const ai3: ResultatJoueur = new ResultatJoueur("ai3", false, new Array<TempsAffichage>(temps4, temps4, temps4), tempsfinal4);

export const RESULTATS_BIDONS: ResultatJoueur[] = new Array<ResultatJoueur>(ai1, bob, ai2, ai3);
