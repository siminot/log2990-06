import Types from "./types";
import { Container } from "inversify";
import { Server } from "./server";
import { Application } from "./app";

import { RouteServiceLexical } from "./serviceLexical/routeServiceLexical";
import { ServiceLexical } from "./ServiceLexical/ServiceLexical";

import { RouteGenGrille } from "./generateurGrille/routeGenGrille";
import { GenerateurGrille } from "./generateurGrille/generateurGrille";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.RouteServiceLexical).to(RouteServiceLexical);
container.bind(Types.ServiceLexical).to(ServiceLexical);

container.bind(Types.GenerateurGrille).to(GenerateurGrille);
container.bind(Types.RouteGenGrille).to(RouteGenGrille);

export { container };
