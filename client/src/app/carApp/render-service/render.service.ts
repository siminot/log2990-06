import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import { PerspectiveCamera, WebGLRenderer, Scene, AmbientLight, Vector3, GridHelper, AxisHelper } from "three";
import { Car } from "../car/car";

const FAR_CLIPPING_PLANE: number = 1000;
const NEAR_CLIPPING_PLANE: number = 1;
const FIELD_OF_VIEW: number = 70;

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d
const CHANGER_VUE: number = 86;         // v

const INITIAL_CAMERA_POSITION_Y: number = 25;
const WHITE: number = 0xFFFFFF;
const AMBIENT_LIGHT_OPACITY: number = 0.5;

@Injectable()
export class RenderService {
    private camera: PerspectiveCamera;
    private container: HTMLDivElement;
    private _car: Car;
    private renderer: WebGLRenderer;
    private scene: THREE.Scene;
    private stats: Stats;
    private lastDate: number;
    private cameraEst3e: boolean;

    public get car(): Car {
        return this._car;
    }

    public constructor() {
        this._car = new Car();
        this.cameraEst3e = false;
    }

    public async initialize(container: HTMLDivElement): Promise<void> {
        if (container) {
            this.container = container;
        }

        await this.createScene();
        this.initStats();
        this.startRenderingLoop();
    }

    private initStats(): void {
        this.stats = new Stats();
        this.stats.dom.style.position = "absolute";
        this.container.appendChild(this.stats.dom);
    }

    private update(): void {
        const timeSinceLastFrame: number = Date.now() - this.lastDate;
        this._car.update(timeSinceLastFrame);
        this.lastDate = Date.now();

        this.updateCamera();
    }

    private updateCamera(): void {
        this.scene.remove(this.camera);

        if (this.cameraEst3e) {
            this.reglerCameraTroisimePersonne();
        } else {
            this.reglerCameraVueDessus();
        }
    }

    private async createScene(): Promise<void> {
        this.scene = new Scene();

        await this._car.init();

        this.updateCamera();

        // Grille
        const TAILLE_GRILLE: number = 1000;
        const DIVISION_GRILLE: number = 100;
        const COULEUR_GRAND_CARRE: number = 0x000000;
        const COULEUR_PETIT_CARRE: number = 0x00BFFF;
        this.scene.add( new GridHelper( TAILLE_GRILLE, DIVISION_GRILLE, COULEUR_GRAND_CARRE, COULEUR_PETIT_CARRE ) );

        // Axes
        const TAILLE_AXE: number = 1000;
        const AXES: AxisHelper = new AxisHelper(TAILLE_AXE);
        this.scene.add(AXES);

        this.scene.add(this._car);
        this.scene.add(new AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));
    }

    private reglerCameraTroisimePersonne(): void {
        const RAYON: number = 10;

        const POSITION_PLAN_XZ: Vector3 = this._car.direction.negate();

        const POSITION_X: number = POSITION_PLAN_XZ.x; // Vue derriere la voiture
        const POSITION_Z: number = POSITION_PLAN_XZ.z;
        const POSITION_Y: number = 0.5; // Hauteur de la camera

        const POSITION_RELATIVE_CAMERA: Vector3 =
            new Vector3(POSITION_X, POSITION_Y, POSITION_Z).normalize().multiplyScalar(RAYON);

        const POSITION_CAMERA: Vector3 = POSITION_RELATIVE_CAMERA.add(this._car.getPosition());

        const CHAMP_DE_VISION: number = 70;
        const PLAN_RAPPROCHE: number = 1;
        const PLAN_ELOIGNE: number = 1000;

        this.camera = new PerspectiveCamera(
            CHAMP_DE_VISION,
            this.getAspectRatio(),
            PLAN_RAPPROCHE,
            PLAN_ELOIGNE
        );

        this.camera.position.set(POSITION_CAMERA.x, POSITION_CAMERA.y, POSITION_CAMERA.z);
        this.camera.rotateY(this._car.angle);
        this.camera.lookAt(this._car.getPosition());
    }

    private reglerCameraVueDessus(): void {
        const RAYON: number = 7;
        const POSITION_X: number = 0; // Vue derriere la voiture
        const POSITION_Y: number = INITIAL_CAMERA_POSITION_Y; // Hauteur de la camera
        const POSITION_Z: number = 0;

        const POSITION_RELATIVE_CAMERA: Vector3 = new Vector3(POSITION_X, POSITION_Y, POSITION_Z).normalize().multiplyScalar(RAYON);

        const POSITION_CAMERA: Vector3 = POSITION_RELATIVE_CAMERA.add(this._car.getPosition());

        this.camera = new PerspectiveCamera(
            FIELD_OF_VIEW,
            this.getAspectRatio(),
            NEAR_CLIPPING_PLANE,
            FAR_CLIPPING_PLANE
        );

        this.camera.position.set(POSITION_CAMERA.x, POSITION_CAMERA.y, POSITION_CAMERA.z);
        this.camera.lookAt(this._car.getPosition());
    }

    private getAspectRatio(): number {
        return this.container.clientWidth / this.container.clientHeight;
    }

    private startRenderingLoop(): void {
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.lastDate = Date.now();
        this.container.appendChild(this.renderer.domElement);
        this.render();
    }

    private render(): void {
        requestAnimationFrame(() => this.render());
        this.update();
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }

    public onResize(): void {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    // TODO: Create an event handler service.
    public handleKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                this._car.isAcceleratorPressed = true;
                break;
            case LEFT_KEYCODE:
                this._car.steerLeft();
                break;
            case RIGHT_KEYCODE:
                this._car.steerRight();
                break;
            case BRAKE_KEYCODE:
                this._car.brake();
                break;
            default:
                break;
        }
    }

    // TODO: Create an event handler service.
    public handleKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                this._car.isAcceleratorPressed = false;
                break;
            case LEFT_KEYCODE:
            case RIGHT_KEYCODE:
                this._car.releaseSteering();
                break;
            case BRAKE_KEYCODE:
                this._car.releaseBrakes();
                break;
            case CHANGER_VUE:
                this.cameraEst3e = !this.cameraEst3e;
                break;
            default:
                break;
        }
    }
}
