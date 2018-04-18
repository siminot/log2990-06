import { Voiture } from "./voiture";
import { DEFAULT_WHEELBASE, DEFAULT_MASS, DEFAULT_DRAG_COEFFICIENT } from "./constantesVoiture";
import { Engine } from "./engine";
import { Wheel } from "./wheel";
import { Vector3, Object3D } from "three";
import { PI_OVER_2 } from "../constants";

const MS_BETWEEN_FRAMES: number = 16.6667;
const NOMBRE_PHARES: number = 2;
const NOMBRE_SONS: number = 4;
const NOMBRE_RAYCASTER: number = 1;

/* tslint:disable: no-magic-numbers */
class MockEngine extends Engine {
    public getDriveTorque(): number {
        return 10000;
    }
}

describe("Voiture", () => {
    let car: Voiture;

    beforeEach(async (done: () => void) => {
        car = new Voiture();
        car.initialiser(new Object3D, PI_OVER_2);

        car.accelerer();
        car.miseAJour(MS_BETWEEN_FRAMES);
        car.relacherAccelerateur();
        done();
    });

    it("should be instantiable using default constructor", () => {
        car = new Voiture();
        expect(car).toBeDefined();
        expect(car.speed.length()).toBe(0);
    });

    it("should accelerate when accelerator is pressed", () => {
        const initialSpeed: number = car.speed.length();
        car.accelerer();
        car.miseAJour(MS_BETWEEN_FRAMES);
        expect(car.speed.length()).toBeGreaterThan(initialSpeed);
    });

    it("should decelerate when brake is pressed", () => {
        car.accelerer();
        car.miseAJour(MS_BETWEEN_FRAMES);
        car.relacherAccelerateur();

        const initialSpeed: number = car.speed.length();
        car.freiner();
        car.miseAJour(MS_BETWEEN_FRAMES);
        expect(car.speed.length()).toBeLessThan(initialSpeed);
    });

    it("should decelerate without brakes", () => {
        const initialSpeed: number = car.speed.length();

        car.relacherFreins();
        car.miseAJour(MS_BETWEEN_FRAMES);
        expect(car.speed.length()).toBeLessThan(initialSpeed);
    });

    it("should turn left when left turn key is pressed", () => {
        const initialAngle: number = car.angle;
        car.accelerer();
        car.virerGauche();
        car.miseAJour(MS_BETWEEN_FRAMES * 2);
        expect(car.angle).toBeLessThan(initialAngle);
    });

    it("should turn right when right turn key is pressed", () => {
        const initialAngle: number = car.angle;
        car.accelerer();
        car.virerDroite();
        car.miseAJour(MS_BETWEEN_FRAMES * 2);
        expect(car.angle).toBeLessThan(initialAngle);
    });

    it("should not turn when steering keys are released", () => {
        car.accelerer();
        car.virerDroite();
        car.miseAJour(MS_BETWEEN_FRAMES);

        const initialAngle: number = car.angle;
        car.relacherVolant();
        car.miseAJour(MS_BETWEEN_FRAMES);
        expect(car.angle).toBe(initialAngle);
    });

    it("should use default engine parameter when none is provided", () => {
        car = new Voiture(undefined);
        expect(car["moteur"]).toBeDefined();
    });

    it("should use default Wheel parameter when none is provided", () => {
        car = new Voiture(new MockEngine(), undefined);
        expect(car["roueArriere"]).toBeDefined();
    });

    it("should check validity of wheelbase parameter", () => {
        car = new Voiture(new MockEngine(), new Wheel(), 0);
        expect(car["empattement"]).toBe(DEFAULT_WHEELBASE);
    });

    it("should check validity of mass parameter", () => {
        car = new Voiture(new MockEngine(), new Wheel(), DEFAULT_WHEELBASE, 0);
        expect(car["masse"]).toBe(DEFAULT_MASS);
    });

    it("should check validity of dragCoefficient parameter", () => {
        car = new Voiture(new MockEngine(), new Wheel(), DEFAULT_WHEELBASE, DEFAULT_MASS, -10);
        expect(car["_trainee"]).toBe(DEFAULT_DRAG_COEFFICIENT);
    });

    it("phares initialises", () => {
        car = new Voiture(undefined);
        car.initialiser(new Object3D(), PI_OVER_2);
        expect(car.children.length - NOMBRE_SONS - NOMBRE_RAYCASTER).toBe(NOMBRE_PHARES);
    });

    it("la direction est bien initialisee", () => {
        car = new Voiture(undefined);
        expect(car.direction.x).toEqual(0);
        expect(car.direction.z).toEqual(-1);
        car.initialiser(new Object3D(), PI_OVER_2);
        expect(car.direction.x).toEqual(-1);
        expect(car.direction.z).toBeCloseTo(0);
    });
});
