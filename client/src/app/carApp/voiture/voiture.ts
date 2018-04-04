import { Vector3, Matrix4, Object3D, Euler, Quaternion, Box3 } from "three";
import { Engine } from "./engine";
import { MS_TO_SECONDS, GRAVITY } from "../constants";
import { Wheel } from "./wheel";
import { GroupePhares } from "./groupePhares";

export const DEFAULT_WHEELBASE: number = 2.78;
export const DEFAULT_MASS: number = 1515;
export const DEFAULT_DRAG_COEFFICIENT: number = 0.35;

const MAXIMUM_STEERING_ANGLE: number = 0.25;
const INITIAL_WEIGHT_DISTRIBUTION: number = 0.5;
const MINIMUM_SPEED: number = 0.2;
const NUMBER_REAR_WHEELS: number = 2;
const NUMBER_WHEELS: number = 4;
const CAR_SURFACE: number = 3;
const AIR_DENSITY: number = 1.2;
const TIRE_PRESSURE: number = 1;

export class Voiture extends Object3D {
    private readonly engine: Engine;
    private readonly mass: number;
    private readonly rearWheel: Wheel;
    private readonly wheelbase: number;
    private readonly dragCoefficient: number;

    private _speed: Vector3;
    private _isAcceleratorPressed: boolean;
    private isBraking: boolean;
    private steeringWheelDirection: number;
    private weightRear: number;
    private phares: GroupePhares;
    private boiteCollision: Box3;

    public get isAcceleratorPressed(): boolean {
        return this._isAcceleratorPressed;
    }

    public get speed(): Vector3 {
        return this._speed.clone();
    }

    public get currentGear(): number {
        return this.engine.currentGear;
    }

    public get rpm(): number {
        return this.engine.rpm;
    }

    public get angle(): number {
        return this.rotation.y;
    }

    public get direction(): Vector3 {
        const rotationMatrix: Matrix4 = new Matrix4();
        const carDirection: Vector3 = new Vector3(0, 0, -1);

        rotationMatrix.extractRotation(this.matrix);
        carDirection.applyMatrix4(rotationMatrix);

        return carDirection;
    }

    public constructor(
        engine: Engine = new Engine(),
        rearWheel: Wheel = new Wheel(),
        wheelbase: number = DEFAULT_WHEELBASE,
        mass: number = DEFAULT_MASS,
        dragCoefficient: number = DEFAULT_DRAG_COEFFICIENT) {
        super();

        if (wheelbase <= 0) {
            console.error("Wheelbase should be greater than 0.");
            wheelbase = DEFAULT_WHEELBASE;
        }

        if (mass <= 0) {
            console.error("Mass should be greater than 0.");
            mass = DEFAULT_MASS;
        }

        if (dragCoefficient <= 0) {
            console.error("Drag coefficient should be greater than 0.");
            dragCoefficient = DEFAULT_DRAG_COEFFICIENT;
        }

        this.engine = engine;
        this.rearWheel = rearWheel;
        this.wheelbase = wheelbase;
        this.mass = mass;
        this.dragCoefficient = dragCoefficient;
        this.isBraking = false;
        this.steeringWheelDirection = 0;
        this.weightRear = INITIAL_WEIGHT_DISTRIBUTION;
        this._speed = new Vector3(0, 0, 0);
        this.boiteCollision = new Box3();
        this.phares = new GroupePhares();
    }

    public initialiser(texture: Object3D, rotation: Euler): void {
        this.add(texture);
        this.setRotationFromEuler(rotation);
        this.boiteCollision.setFromObject(this);
        this.initialiserPhares();
    }

    public virerGauche(): void {
        this.steeringWheelDirection = MAXIMUM_STEERING_ANGLE;
    }

    public virerDroite(): void {
        this.steeringWheelDirection = -MAXIMUM_STEERING_ANGLE;
    }

    public relacherVolant(): void {
        this.steeringWheelDirection = 0;
    }

    public relacherFreins(): void {
        this.isBraking = false;
    }

    public freiner(): void {
        this.isBraking = true;
    }

    public relacherAccelerateur(): void {
        this._isAcceleratorPressed = false;
    }

    public accelerer(): void {
        this._isAcceleratorPressed = true;
    }

    public update(deltaTime: number): void {
        deltaTime = deltaTime / MS_TO_SECONDS;

        // Move to car coordinates
        const rotationMatrix: Matrix4 = new Matrix4();
        rotationMatrix.extractRotation(this.matrix);
        const rotationQuaternion: Quaternion = new Quaternion();
        rotationQuaternion.setFromRotationMatrix(rotationMatrix);
        this._speed.applyMatrix4(rotationMatrix);

        // Physics calculations
        this.physicsUpdate(deltaTime);

        // Move back to world coordinates
        this._speed = this.speed.applyQuaternion(rotationQuaternion.inverse());

        // Angular rotation of the car
        const R: number = DEFAULT_WHEELBASE / Math.sin(this.steeringWheelDirection * deltaTime);
        this.rotateY(this._speed.length() / R);

        this.boiteCollision.setFromCenterAndSize(this.position, this.boiteCollision.getSize()); // manque orientation de la boite...
    }

    public eteindrePhares(): void {
        this.phares.eteindre();
    }

    public allumerPhares(): void {
        this.phares.allumer();
    }

    public changerEtatPhares(): void {
        this.phares.fonctionnent
            ? this.phares.eteindre()
            : this.phares.allumer();
    }

    private initialiserPhares(): void {
        this.phares.initialiser();
        this.add(this.phares);
    }

    private physicsUpdate(deltaTime: number): void {
        this.rearWheel.ajouterVelociteAngulaire(this.getAngularAcceleration() * deltaTime);
        this.engine.update(this._speed.length(), this.rearWheel.radius);
        this.weightRear = this.getWeightDistribution();
        this._speed.add(this.getDeltaSpeed(deltaTime));
        this._speed.setLength(this._speed.length() <= MINIMUM_SPEED && !this._isAcceleratorPressed ? 0 : this._speed.length());
        this.position.add(this.getDeltaPosition(deltaTime));
        this.rearWheel.update(this._speed.length());
    }

    private getWeightDistribution(): number {
        /* tslint:disable:no-magic-numbers */
        const distribution: number =
            this.mass + (1 / this.wheelbase) * this.mass * this.getAcceleration().length() / 2;

        return Math.min(Math.max(0.25, distribution), 0.75);
        /* tslint:enable:no-magic-numbers */
    }

    private getLongitudinalForce(): Vector3 {
        const resultingForce: Vector3 = new Vector3();

        if (this._speed.length() >= MINIMUM_SPEED) {
            resultingForce.add(this.getDragForce()).add(this.getRollingResistance());
        }

        if (this.isAcceleratorPressed) {
            const accelerationForce: Vector3 = this.direction;
            accelerationForce.multiplyScalar(this.getTractionForce());
            resultingForce.add(accelerationForce);
        } else if (this.isBraking && this.isGoingForward()) {
            resultingForce.add(this.getBrakeForce());
        }

        return resultingForce;
    }

    private getRollingResistance(): Vector3 {
        // formula taken from: https://www.engineeringtoolbox.com/rolling-friction-resistance-d_1303.html
        // tslint:disable-next-line:no-magic-numbers
        const rollingCoefficient: number = (1 / TIRE_PRESSURE) * (Math.pow(this.speed.length() * 3.6 / 100, 2) * 0.0095 + 0.01) + 0.005;

        return this.direction.multiplyScalar(rollingCoefficient * this.mass * GRAVITY);
    }

    private getDragForce(): Vector3 {
        const resistance: Vector3 = this.direction;
        resistance.multiplyScalar(AIR_DENSITY * CAR_SURFACE * -this.dragCoefficient * this.speed.length() * this.speed.length());

        return resistance;
    }

    private getTractionForce(): number {
        const maxForce: number =
            this.rearWheel.frictionCoefficient * this.mass * GRAVITY * this.weightRear * NUMBER_REAR_WHEELS / NUMBER_WHEELS;

        return -Math.min(this.getEngineForce(), maxForce);
    }

    private getAngularAcceleration(): number {
        return this.getTotalTorque() / (this.rearWheel.inertia * NUMBER_REAR_WHEELS);
    }

    private getBrakeForce(): Vector3 {
        return this.direction.multiplyScalar(this.rearWheel.frictionCoefficient * this.mass * GRAVITY);
    }

    private getBrakeTorque(): number {
        return this.getBrakeForce().length() * this.rearWheel.radius;
    }

    private getTractionTorque(): number {
        return this.getTractionForce() * this.rearWheel.radius;
    }

    private getTotalTorque(): number {
        return this.getTractionTorque() * NUMBER_REAR_WHEELS + this.getBrakeTorque();
    }

    private getEngineForce(): number {
        return this.engine.getDriveTorque() / this.rearWheel.radius;
    }

    private getAcceleration(): Vector3 {
        return this.getLongitudinalForce().divideScalar(this.mass);
    }

    private getDeltaSpeed(deltaTime: number): Vector3 {
        return this.getAcceleration().multiplyScalar(deltaTime);
    }

    private getDeltaPosition(deltaTime: number): Vector3 {
        return this.speed.multiplyScalar(deltaTime);
    }

    private isGoingForward(): boolean {
        // tslint:disable-next-line:no-magic-numbers
        return this.speed.normalize().dot(this.direction) > 0.05;
    }
}
