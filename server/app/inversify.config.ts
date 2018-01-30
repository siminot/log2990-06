import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";

import { GenerateurGrille } from "./generateurGrille/generateurGrille"
import { RouteGenGrille } from "./routeGenGrille"

import { Index } from "./routes/index";
import { Routes } from "./routes";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.Index).to(Index);
container.bind(Types.Routes).to(Routes);

container.bind(Types.GenerateurGrille).to(GenerateurGrille);
container.bind(Types.RouteGenGrille).to(RouteGenGrille);

export { container };
