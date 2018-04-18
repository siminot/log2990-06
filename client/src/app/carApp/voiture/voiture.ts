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
    private readonly moteur: Engine;
    private readonly masse: number;
    private readonly roueArriere: Wheel;
    private readonly empattement: number;
    private readonly _trainee: number;

    private vitesse: Vector3;
    private accelerateurEstPresse: boolean;
    private estEnFreinage: boolean;
    private directionDuVolant: number;
    private poidsArriere: number;
    private phares: GroupePhares;
    private sonVoiture: SonVoiture;
    private sonCollision: SonCollision;
    private sonSortieRoute: SonSortieRoute;
    private sortiePiste: VerificateurSortiePiste;

    public jouerSonCollision(): void {
        this.sonCollision.jouerSon();
    }

    public jouerSonSortieRoute(): void {
        this.sonSortieRoute.jouerSon();
    }

    public get speed(): Vector3 {
        return this.vitesse.clone();
    }

    public set speed(nouvelleVitesse: Vector3) {
        this.vitesse = nouvelleVitesse;
    }

    public get currentGear(): number {
        return this.moteur.currentGear;
    }

    public get rpm(): number {
        return this.moteur.rpm;
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
        this.moteur = engine;
        this.roueArriere = rearWheel;
        this.empattement = wheelbase;
        this.masse = mass;
        this._trainee = dragCoefficient;
        this.estEnFreinage = false;
        this.directionDuVolant = 0;
        this.poidsArriere = INITIAL_WEIGHT_DISTRIBUTION;
        this.vitesse = new Vector3(0, 0, 0);
        this.add(this.sortiePiste = new VerificateurSortiePiste());
        this.initialiserPhares();
        this.initialiserSons();
    }

    private initialiserSons(): void {
        this.sonVoiture = new SonVoiture();
        this.add(this.sonVoiture.obtenirSonRepos);
        this.add(this.sonVoiture.obtenirSonAccel);
        this.sonCollision = new SonCollision();
        this.add(this.sonCollision.obtenirSon);
        this.sonSortieRoute = new SonSortieRoute();
        this.add(this.sonSortieRoute.obtenirSon);
     }

    public initialiser(texture: Object3D, angle: number): void {
        this.add(texture);
        this.rotateY(angle);
        this.updateMatrix();
    }

    public virerGauche(): void {
        this.directionDuVolant = MAXIMUM_STEERING_ANGLE;
    }

    public virerDroite(): void {
        this.directionDuVolant = -MAXIMUM_STEERING_ANGLE;
    }

    public relacherVolant(): void {
        this.directionDuVolant = 0;
    }

    public relacherFreins(): void {
        this.estEnFreinage = false;
    }

    public freiner(): void {
        this.estEnFreinage = true;
        this.verificationRepos();
    }

    private verificationRepos(): void {
        if (this.vitesse.length() <= VITESSE_MIN) {
            this.sonVoiture.jouerRepos();
        }
    }

    public relacherAccelerateur(): void {
        this.accelerateurEstPresse = false;
        this.verificationRepos();
    }

    public accelerer(): void {
        this.accelerateurEstPresse = true;
        this.sonVoiture.jouerAccel();
    }

    public get vitesseDansMonde(): Vector3 {
        return this.speed.applyMatrix4(this.matriceRotation);
    }

    public vitesseEnLocal(nouvelleVitesse: Vector3): void {
        this.vitesse = nouvelleVitesse.applyQuaternion(this.quaternionRotation.inverse());
    }

    private get matriceRotation(): Matrix4 {
        return new Matrix4().extractRotation(this.matrix);
    }

    private get quaternionRotation(): Quaternion {
        return new Quaternion().setFromRotationMatrix(this.matriceRotation);
    }

    public miseAJour(deltaTime: number): void {
        this.vitesse.applyMatrix4(this.matriceRotation);
        this.physicsUpdate(deltaTime / MS_TO_SECONDS);
        this.vitesse = this.speed.applyQuaternion(this.quaternionRotation.inverse());
        this.rotateY(this.vitesse.length() / this.rotationAngulaire(deltaTime / MS_TO_SECONDS));
    }

    private rotationAngulaire(deltaTime: number): number {
        return DEFAULT_WHEELBASE / Math.sin(this.directionDuVolant * deltaTime);
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
        this.roueArriere.ajouterVelociteAngulaire(this.accelerationAngulaire * deltaTime);
        this.moteur.update(this.vitesse.length(), this.roueArriere.radius);
        this.poidsArriere = this.distributionDuPoids;
        this.vitesse.add(this.obtenirDeltaVitesse(deltaTime));
        this.vitesse.setLength(this.vitesse.length() <= MINIMUM_SPEED && !this.accelerateurEstPresse ? 0 : this.vitesse.length());
        this.position.add(this.obtenirDeltaPosition(deltaTime));
        this.roueArriere.update(this.vitesse.length());
        this.sonVoiture.actualiserSon(this.rpm);
    }

    private get distributionDuPoids(): number {
        return Math.min(Math.max(DISTRIBUTION_POIDS_MINIMAL, this.poids), DISTRIBUTION_POIDS_MAXIMAL);
    }

    private get poids(): number {
        // tslint:disable-next-line:no-magic-numbers
        return this.masse + (1 / this.empattement) * this.masse * this.acceleration.length() / 2;
    }

    private get forceLongitudinale(): Vector3 {
        const forceResultante: Vector3 = new Vector3();

        if (this.accelerateurEstPresse) {
            forceResultante.add(this.forceAcceleration);
        } else if (this.estEnFreinage && this.seDirigeVersAvant) {
            forceResultante.add(this.forceDeFreinage);
        }

        return this.vitesse.length() >= MINIMUM_SPEED
            ? forceResultante.add(this.trainee).add(this.distanceDeRoulement)
            : forceResultante;
    }

    private get forceAcceleration(): Vector3 {
        return this.direction.multiplyScalar(this.forceDeTraction);
    }

    private get distanceDeRoulement(): Vector3 {
        // formula taken from: https://www.engineeringtoolbox.com/rolling-friction-resistance-d_1303.html
        // tslint:disable-next-line:no-magic-numbers
        const coefficientDeRoulement: number = (1 / TIRE_PRESSURE) * (Math.pow(this.speed.length() * 3.6 / 100, 2) * 0.0095 + 0.01) + 0.005;

        return this.direction.multiplyScalar(coefficientDeRoulement * this.masse * GRAVITY);
    }

    private get trainee(): Vector3 {
        return this.direction.multiplyScalar(AIR_DENSITY * CAR_SURFACE * -this._trainee * this.speed.length() * this.speed.length());
    }

    private get forceDeTraction(): number {
        return -Math.min(this.forceDuMoteur, this.friction);
    }

    private get friction(): number {
        return this.roueArriere.frictionCoefficient * this.masse * GRAVITY * this.poidsArriere * NUMBER_REAR_WHEELS / NUMBER_WHEELS;
    }

    private get accelerationAngulaire(): number {
        return this.torqueTotal / (this.roueArriere.inertia * NUMBER_REAR_WHEELS);
    }

    private get forceDeFreinage(): Vector3 {
        return this.direction.multiplyScalar(this.roueArriere.frictionCoefficient * this.masse * GRAVITY);
    }

    private get torqueDesFreins(): number {
        return this.forceDeFreinage.length() * this.roueArriere.radius;
    }

    private get torqueDeTraction(): number {
        return this.forceDeTraction * this.roueArriere.radius;
    }

    private get torqueTotal(): number {
        return this.torqueDeTraction * NUMBER_REAR_WHEELS + this.torqueDesFreins;
    }

    private get forceDuMoteur(): number {
        return this.moteur.getDriveTorque() / this.roueArriere.radius;
    }

    private get acceleration(): Vector3 {
        return this.forceLongitudinale.divideScalar(this.masse);
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
