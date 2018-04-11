import { Voiture, DEFAULT_WHEELBASE, DEFAULT_MASS, DEFAULT_DRAG_COEFFICIENT } from "./voiture";
import { Engine } from "./engine";
import { Wheel } from "./wheel";
import { Vector3, Object3D, Euler } from "three";
import { PI_OVER_2 } from "../constants";

const MS_BETWEEN_FRAMES: number = 16.6667;
const NOMBRE_PHARES: number = 2;
const NOMBRE_SONS: number = 2;

const ROTATION_TEST: Euler = new Euler(0, PI_OVER_2, 0, "XYZ");

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
        car.initialiser(new Object3D, ROTATION_TEST);

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
        // Remove rolling resistance and drag force so the only force slowing down the car is the brakes.
        car["getRollingResistance"] = () => {
            return new Vector3(0, 0, 0);
        };

        car["getDragForce"] = () => {
            return new Vector3(0, 0, 0);
        };

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
        expect(car["engine"]).toBeDefined();
    });

    it("should use default Wheel parameter when none is provided", () => {
        car = new Voiture(new MockEngine(), undefined);
        expect(car["rearWheel"]).toBeDefined();
    });

    it("should check validity of wheelbase parameter", () => {
        car = new Voiture(new MockEngine(), new Wheel(), 0);
        expect(car["wheelbase"]).toBe(DEFAULT_WHEELBASE);
    });

    it("should check validity of mass parameter", () => {
        car = new Voiture(new MockEngine(), new Wheel(), DEFAULT_WHEELBASE, 0);
        expect(car["mass"]).toBe(DEFAULT_MASS);
    });

    it("should check validity of dragCoefficient parameter", () => {
        car = new Voiture(new MockEngine(), new Wheel(), DEFAULT_WHEELBASE, DEFAULT_MASS, -10);
        expect(car["dragCoefficient"]).toBe(DEFAULT_DRAG_COEFFICIENT);
    });

    it("phares initialises", () => {
        car = new Voiture(undefined);
        car.initialiser(new Object3D(), ROTATION_TEST);
        expect(car.children.length - NOMBRE_SONS).toBe(NOMBRE_PHARES);
    });

    it("la direction est bien initialisee", () => {
        car = new Voiture(undefined);
        expect(car.direction.x).toEqual(0);
        expect(car.direction.z).toEqual(-1);
        car.initialiser(new Object3D(), ROTATION_TEST);
        expect(car.direction.x).toEqual(-1);
        expect(car.direction.z).toBeCloseTo(0);
    });
});
