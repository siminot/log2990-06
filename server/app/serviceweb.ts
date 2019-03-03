// Code de Michel Gagnon tiré du cours LOG2990

import { injectable } from "inversify";
import { Router } from "express";

export const SERVER_HOSTNAME: string = "server";

@injectable()
export abstract class ServiceWeb {
    public readonly mainRoute: string;
    public abstract get routes(): Router;
}
