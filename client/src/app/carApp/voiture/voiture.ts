import { Vector3, Matrix4, Object3D, Quaternion } from "three";
import { Engine } from "./engine";
import { MS_TO_SECONDS, GRAVITY } from "../constants";
import { Wheel } from "./wheel";
import { GroupePhares } from "./groupePhares";
import { SonVoiture } from "../son/SonVoiture";
import { IObjetEnMouvement } from "./IObjetEnMouvement";
import { VerificateurSortiePiste } from "./VerificateurSortiePiste";
import { SonCollision } from "../son/SonCollision";
import { SonSortieRoute } from "../son/SonSortieRoute";
import { MAXIMUM_STEERING_ANGLE, INITIAL_WEIGHT_DISTRIBUTION, MINIMUM_SPEED, NUMBER_REAR_WHEELS,
         NUMBER_WHEELS, CAR_SURFACE, AIR_DENSITY, TIRE_PRESSURE, VITESSE_MIN, DEFAULT_WHEELBASE,
         DEFAULT_MASS, DEFAULT_DRAG_COEFFICIENT} from "./constantesVoiture";

export class Voiture extends Object3D implements IObjetEnMouvement {
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
    private _sonVoiture: SonVoiture;
    private _sonCollision: SonCollision;
    private _sonSortieRoute: SonSortieRoute;
    private sortiePiste: VerificateurSortiePiste;

    public  jouerSonCollision(): void {
        this._sonCollision.jouerSon();
    }

    public  jouerSonSortieRoute(): void {
        this._sonSortieRoute.jouerSon();
    }

    public get isAcceleratorPressed(): boolean {
        return this._isAcceleratorPressed;
    }

    public get speed(): Vector3 {
        return this._speed.clone();
    }

    public set speed(nouvelleVitesse: Vector3) {
        this._speed = nouvelleVitesse;
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
        this.sortiePiste = new VerificateurSortiePiste();
        this.add(this.sortiePiste);
        this.initialiserPhares();
        this.initialiserSons();
    }

    private initialiserSons(): void {
        this._sonVoiture = new SonVoiture();
        this.add(this._sonVoiture.obtenirSonRepos);
        this.add(this._sonVoiture.obtenirSonAccel);
        this._sonCollision = new SonCollision();
        this.add(this._sonCollision.obtenirSon);
        this._sonSortieRoute = new SonSortieRoute();
        this.add(this._sonSortieRoute.obtenirSon);
     }

    public initialiser(texture: Object3D, angle: number): void {
        this.add(texture);
        this.rotateY(angle);
        this.updateMatrix();
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
        this.verificationRepos();
    }

    private verificationRepos(): void {
        if (this._speed.length() <= VITESSE_MIN) {
            this._sonVoiture.jouerRepos();
        }
    }

    public relacherAccelerateur(): void {
        this._isAcceleratorPressed = false;
        this.verificationRepos();
    }

    public accelerer(): void {
        this._isAcceleratorPressed = true;
        this._sonVoiture.jouerAccel();
    }

    public getDirection(): Vector3 {
        return this.direction;
    }

    public get vitesseDansMonde(): Vector3 {
        const rotationMatrix: Matrix4 = new Matrix4();

        rotationMatrix.extractRotation(this.matrix);
        const rotationQuaternion: Quaternion = new Quaternion();
        rotationQuaternion.setFromRotationMatrix(rotationMatrix);

        return this._speed.clone().applyMatrix4(rotationMatrix);
    }

    public vitesseEnLocal(nouvelleVitesse: Vector3): void {
        const rotationMatrix: Matrix4 = new Matrix4().extractRotation(this.matrix);
        const rotationQuaternion: Quaternion = new Quaternion().setFromRotationMatrix(rotationMatrix);
        this._speed = nouvelleVitesse.applyQuaternion(rotationQuaternion.inverse());
    }

    public miseAJour(deltaTime: number): void {
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
    }

    public get estSurPiste(): boolean {
        return this.sortiePiste.estSurPiste;
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
        this.phares = new GroupePhares();
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
        this.updateSon();
    }

    private updateSon(): void {
        this._sonVoiture.actualiserSon(this.rpm);
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
