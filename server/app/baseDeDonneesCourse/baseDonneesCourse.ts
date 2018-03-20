import * as mongoose from "mongoose";
import { RouteBaseDonneesCourse } from "./routeBaseDonneesCourse";

export class BaseDonneesCourse {

    private routeBaseDonneesCourse: RouteBaseDonneesCourse = new RouteBaseDonneesCourse();
    private connection: mongoose.Connection;

    constructor() { }

    public async seConnecter(): Promise<void> {
        await mongoose.connect(this.routeBaseDonneesCourse.mainRoute);
        this.connection = mongoose.connection;
    }

    public etatConnection(): number {
        return this.connection.readyState;

    }


}


