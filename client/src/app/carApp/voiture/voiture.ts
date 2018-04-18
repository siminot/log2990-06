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
         DEFAULT_MASS, DEFAULT_DRAG_COEFFICIENT, DISTRIBUTION_POIDS_MINIMAL, DISTRIBUTION_POIDS_MAXIMAL} from "./constantesVoiture";

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

    public jouerSonCollision(): void {
        this._sonCollision.jouerSon();
    }

    public jouerSonSortieRoute(): void {
        this._sonSortieRoute.jouerSon();
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
        return new Vector3(0, 0, -1).applyMatrix4(this.matriceRotation);
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
        this.add(this.sortiePiste = new VerificateurSortiePiste());
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

    public get vitesseDansMonde(): Vector3 {
        return this.speed.applyMatrix4(this.matriceRotation);
    }

    public vitesseEnLocal(nouvelleVitesse: Vector3): void {
        this._speed = nouvelleVitesse.applyQuaternion(this.quaternionRotation.inverse());
    }

    private get matriceRotation(): Matrix4 {
        return new Matrix4().extractRotation(this.matrix);
    }

    private get quaternionRotation(): Quaternion {
        return new Quaternion().setFromRotationMatrix(this.matriceRotation);
    }

    public miseAJour(deltaTime: number): void {
        this._speed.applyMatrix4(this.matriceRotation);
        this.physicsUpdate(deltaTime / MS_TO_SECONDS);
        this._speed = this.speed.applyQuaternion(this.quaternionRotation.inverse());
        this.rotateY(this._speed.length() / this.rotationAngulaire(deltaTime / MS_TO_SECONDS));
    }

    private rotationAngulaire(deltaTime: number): number {
        return DEFAULT_WHEELBASE / Math.sin(this.steeringWheelDirection * deltaTime);
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
        this.add(this.phares = new GroupePhares());
        this.phares.initialiser();
    }

    private physicsUpdate(deltaTime: number): void {
        this.rearWheel.ajouterVelociteAngulaire(this.accelerationAngulaire * deltaTime);
        this.engine.update(this._speed.length(), this.rearWheel.radius);
        this.weightRear = this.distributionDuPoids;
        this._speed.add(this.obtenirDeltaVitesse(deltaTime));
        this._speed.setLength(this._speed.length() <= MINIMUM_SPEED && !this._isAcceleratorPressed ? 0 : this._speed.length());
        this.position.add(this.obtenirDeltaPosition(deltaTime));
        this.rearWheel.update(this._speed.length());
        this._sonVoiture.actualiserSon(this.rpm);
    }

    private get distributionDuPoids(): number {
        return Math.min(Math.max(DISTRIBUTION_POIDS_MINIMAL, this.poids), DISTRIBUTION_POIDS_MAXIMAL);
    }

    private get poids(): number {
        // tslint:disable-next-line:no-magic-numbers
        return this.mass + (1 / this.wheelbase) * this.mass * this.acceleration.length() / 2;
    }

    private get forceLongitudinale(): Vector3 {
        const forceResultante: Vector3 = new Vector3();

        if (this._isAcceleratorPressed) {
            forceResultante.add(this.forceAcceleration);
        } else if (this.isBraking && this.seDirigeVersAvant) {
            forceResultante.add(this.forceDeFreinage);
        }

        return this._speed.length() >= MINIMUM_SPEED
            ? forceResultante.add(this.getDragForce()).add(this.distanceDeRoulement)
            : forceResultante;
    }

    private get forceAcceleration(): Vector3 {
        return this.direction.multiplyScalar(this.getTractionForce());
    }

    private get distanceDeRoulement(): Vector3 {
        // formula taken from: https://www.engineeringtoolbox.com/rolling-friction-resistance-d_1303.html
        // tslint:disable-next-line:no-magic-numbers
        const coefficientDeRoulement: number = (1 / TIRE_PRESSURE) * (Math.pow(this.speed.length() * 3.6 / 100, 2) * 0.0095 + 0.01) + 0.005;

        return this.direction.multiplyScalar(coefficientDeRoulement * this.mass * GRAVITY);
    }

    private getDragForce(): Vector3 {
        return this.direction.multiplyScalar(AIR_DENSITY * CAR_SURFACE * -this.dragCoefficient * this.speed.length() * this.speed.length());
    }

    private getTractionForce(): number {
        return -Math.min(this.forceDuMoteur,
                         this.rearWheel.frictionCoefficient * this.mass * GRAVITY * this.weightRear * NUMBER_REAR_WHEELS / NUMBER_WHEELS);
    }

    private get accelerationAngulaire(): number {
        return this.torqueTotal / (this.rearWheel.inertia * NUMBER_REAR_WHEELS);
    }

    private get forceDeFreinage(): Vector3 {
        return this.direction.multiplyScalar(this.rearWheel.frictionCoefficient * this.mass * GRAVITY);
    }

    private get torqueDesFreins(): number {
        return this.forceDeFreinage.length() * this.rearWheel.radius;
    }

    private get torqueDeTraction(): number {
        return this.getTractionForce() * this.rearWheel.radius;
    }

    private get torqueTotal(): number {
        return this.torqueDeTraction * NUMBER_REAR_WHEELS + this.torqueDesFreins;
    }

    private get forceDuMoteur(): number {
        return this.engine.getDriveTorque() / this.rearWheel.radius;
    }

    private get acceleration(): Vector3 {
        return this.forceLongitudinale.divideScalar(this.mass);
    }

    private obtenirDeltaVitesse(deltaTemps: number): Vector3 {
        return this.acceleration.multiplyScalar(deltaTemps);
    }

    private obtenirDeltaPosition(deltaTemps: number): Vector3 {
        return this.speed.multiplyScalar(deltaTemps);
    }

    private get seDirigeVersAvant(): boolean {
        // tslint:disable-next-line:no-magic-numbers
        return this.speed.normalize().dot(this.direction) > 0.05;
    }
}
