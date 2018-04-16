import { TempsJournee } from "./skybox/tempsJournee";

export const STRAIGHT_ANGLE_DEG: number = 180;
export const DEG_TO_RAD: number = Math.PI / STRAIGHT_ANGLE_DEG;
export const MIN_TO_SEC: number = 60;
export const MS_TO_SECONDS: number = 1000;
export const GRAVITY: number = -9.81;
export const RAD_TO_DEG: number = STRAIGHT_ANGLE_DEG / Math.PI;
// tslint:disable-next-line:no-magic-numbers
export const PI_OVER_2: number = Math.PI / 2;
export const TEMPS_JOURNEE_INITIAL: TempsJournee = TempsJournee.Jour;
export const NOM_PISTE_JEU: string = "pisteJeu";
export const NOM_VOITURE_JOUEUR: string = "voitureJoueur";

export const CHIFFRE_ZERO: string = "0";
export const CHIFFRE_NEUF: string = "9";
export const BACKSPACE_KEYCODE: number = 8;
export const TAB_KEYCODE: number = 9;
