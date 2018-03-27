import { Camera } from "three";

export interface ICamera {
    camera: Camera;

    redimensionnement(largeur: number, hauteur: number): void;
}
