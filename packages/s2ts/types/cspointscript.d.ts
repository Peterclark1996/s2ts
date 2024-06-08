interface Instance {
    Msg(message: string | number | boolean): void
    PublicMethod(methodName: string, method: (input: string | number | boolean) => void): void
    GameType(): number
    GameMode(): number
    GetGameTime(): number
    InitialActivate(func: () => void): void
    EntFireAtName(entityName: string, action: string, value?: string, delay?: number): void
    EntFireBroadcast(target: string, operation: string, value?: string | number | boolean): void
    GetPlayerPawn(playerId: string | number | boolean): Pawn
}

interface ClientInstance extends Instance {
    SetNextClientThink(number: number): void
    ClientThink(func: () => void): void
}

interface Pawn {
    GetOriginalController(): Controller
}

interface Controller {
    GetScore(): number
    GetPlayerSlot(): number
}

declare module "cspointscript" {
    export const Instance: Instance
}

declare module "server/cspointscript" {
    export const Instance: Instance
}
