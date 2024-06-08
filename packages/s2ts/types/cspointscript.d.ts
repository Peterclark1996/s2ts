interface Instance {
    /**
     * Sends a message to the server console.
     *
     * @param message the message to send.
     */
    Msg(message: string | number | boolean): void

    /**
     * Defines a public method that can be called from the I/O system in the map.
     *
     * @param methodName the name needed in the "Via this input" field of the I/O system.
     * @param method the method to call when the I/O system calls the method.
     */
    PublicMethod(methodName: string, method: (input: string | number | boolean) => void): void

    /**
     * Gets the current game time in seconds from when the map started.
     *
     * @returns the current game time in second.
     */
    GetGameTime(): number

    /**
     * Gets the current game type.
     * 0 = Classic
     * 1 = Gun Game
     * 2 = Training
     * 3 = Custom
     * 4 = Cooperative
     * 5 = Skirmish
     * 6 = Free For All
     *
     * @returns the current game type.
     */
    GameType(): 0 | 1 | 2 | 3 | 4 | 5 | 6

    /**
     * Gets the current game mode.
     * 0 = Casual (When gametype = 0), Arms Race (When gametype = 1), Training (When gametype = 2), Custom (When gametype = 3), Guardian (When gametype = 4), War Games (When gametype = 5), Danger Zone (When gametype = 6)
     * 1 = Competitive (When gametype = 0), Demolition (When gametype = 1), Co-op Strike (When gametype = 4)
     * 2 = Wingman (When gametype = 0), Deathmatch (When gametype = 1)
     * 3 = Weapons Expert
     * 4 = Training Day
     *
     * @returns the current game mode.
     */
    GameMode(): 0 | 1 | 2 | 3 | 4

    /**
     * Returns true if the game is in a warmup period.
     *
     * @returns true if the game is in a warmup period. false otherwise.
     */
    IsWarmupPeriod(): boolean

    /**
     * Gets a player Pawn handle by their player slot.
     *
     * @param playerId the player slot of the player to get the pawn of.
     */
    GetPlayerPawn(playerId: string | number | boolean): Pawn

    /**
     * Triggers an action on an entity.
     *
     * @param entityName the targetname of the entity to trigger the action on.
     * @param action the action to trigger on the entity.
     * @param value the value to pass to the action.
     * @param delay the delay in seconds before the action is triggered.
     */
    EntFireAtName(entityName: string, action: string, value?: string | number | boolean, delay?: number): void

    /**
     * Prints a message to the screen.
     *
     * @param message the message to print to the screen.
     * @param flScreenX the x position of the message on the screen.
     * @param flScreenY the y position of the message on the screen.
     * @param nTextOffset the offset of the text.
     * @param flDuration the duration of the message on the screen.
     * @param color the color of the message.
     */
    DebugScreenText(message: string, flScreenX: number, flScreenY: number, nTextOffset: number, flDuration: number, color: unknown): void

    /**
     * Triggers an action on an entity.
     *
     * @param target the index of the entity to trigger the action on. Target can be an entity targetname, !self, !activator, !caller or !player
     * @param operation the operation to trigger on the entity.
     * @param value the value to pass to the action.
     * @param delay the delay in seconds before the action is triggered.
     */
    EntFireBroadcast(target: string, operation: string, value?: string | number | boolean, delay?: number): void

    /**
     * Runs a function once the script as finished loading.
     *
     * @param func the func to run once the script has finished loading.
     */
    InitialActivate(func: () => void): void
}

interface ClientInstance extends Instance {
    /**
     * Needs testing.
     */
    SetNextClientThink(number: number): void

    /**
     * Needs testing.
     */
    ClientThink(func: () => void): void
}

interface Pawn {
    /**
     * Finds a weapon by name.
     *
     * @param sWeaponName the name of the weapon to find.
     * @returns the weapon found by name.
     */
    FindWeapon(sWeaponName: string): Weapon

    /**
     * Finds a weapon by slot.
     *
     * @param nSlot the slot of the weapon to find. 0 = Primary, 1 = Secondary, 2 = Knife.
     * @returns the weapon found by slot.
     */
    FindWeaponBySlot(nSlot: 0 | 1 | 2): Weapon

    /**
     * Gets the currently active weapon.
     *
     * @returns the currently active weapon.
     */
    GetActiveWeapon(): Weapon

    /**
     * Destroys the weapon.
     *
     * @param pWeapon the weapon to destroy.
     */
    DestroyWeapon(pWeapon: Weapon): void

    /**
     * Destroys all weapons apart from the knife.
     */
    DestroyWeapons(): void

    /**
     * Needs testing.
     */
    SetGunGameImmunity(): unknown

    /**
     * Needs testing.
     */
    SetGunGameImmunityColor(): unknown

    /**
     * Needs testing.
     */
    GiveNamedItem(): unknown

    /**
     * Needs testing.
     */
    GetCurrentController(): unknown

    /**
     * Needs testing.
     */
    GetOriginalController(): Controller

    /**
     * Needs testing.
     */
    GetAbsOrigin(): unknown

    /**
     * Needs testing.
     */
    GetOrigin(): unknown

    /**
     * Needs testing.
     */
    GetTeamNumber(): unknown

    /**
     * Needs testing.
     */
    ChangeTeam(): unknown

    /**
     * Needs testing.
     */
    GetClassNam(): unknown
}

interface Controller {
    /**
     * Needs testing.
     */
    GetScore(): number

    /**
     * Needs testing.
     */
    GetPlayerSlot(): number
}

interface Weapon {
    /**
     * Needs testing.
     */
    GetData(): unknown

    /**
     * Needs testing.
     */
    GetAbsOrigin(): unknown

    /**
     * Needs testing.
     */
    GetOrigin(): unknown

    /**
     * Needs testing.
     */
    GetTeamNumber(): unknown

    /**
     * Needs testing.
     */
    ChangeTeam(): unknown

    /**
     * Gets the name of the weapon.
     *
     * @returns the name of the weapon.
     */
    GetClassName(): string
}

declare module "cspointscript" {
    export const Instance: Instance
}

declare module "server/cspointscript" {
    export const Instance: Instance
}
