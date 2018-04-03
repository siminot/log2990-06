import { Point } from "../elementsGeometrie/point";
import { PisteBD } from "./IPisteBD";

const LONGUEUR: number = 100;

export const PISTE_TEST: Point[] = [
    new Point(0, 0),
    new Point(-LONGUEUR, 0),
    new Point(-LONGUEUR, -LONGUEUR),
    new Point(0, -LONGUEUR),
];

export const PISTE1: PisteBD = {
    _id: "1",
    nom: "Piste 1",
    description: "Parc au centre de la ville",
    points: PISTE_TEST,
    infos: "Cette piste est un test parmi plusieurs. Enjoy the ride.",
    tempsTours: [{ min: 0, sec: 0, milliSec: 0 }]
};

export const PISTE2: PisteBD = {
    _id: "2",
    nom: "Piste 2",
    description: "Champs de ble",
    points: PISTE_TEST,
    infos: "Riders on the storm.",
    tempsTours: [{ min: 0, sec: 0, milliSec: 0 }]
};

export const PISTES: PisteBD[] = [PISTE1, PISTE2];
