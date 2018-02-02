import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";
import { RouteServiceLexical } from "./crosswords/serviceLexical/routeServiceLexical";
import { ServiceLexical } from "./crosswords/serviceLexical/ServiceLexical";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.RouteServiceLexical).to(RouteServiceLexical);

container.bind(Types.ServiceLexical).to(ServiceLexical);

export { container };
