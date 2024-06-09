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
    GetPlayerPawn(playerId: string | number | boolean): Pawn | undefined

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
     * @param target the index of the entity to trigger the action on. Target can be an entity targetname, !self, !activator, !caller or !player.
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
    FindWeapon(sWeaponName: string): Weapon | undefined

    /**
     * Finds a weapon by slot.
     *
     * @param nSlot the slot of the weapon to find. 0 = Primary, 1 = Secondary, 2 = Knife.
     * @returns the weapon found by slot.
     */
    FindWeaponBySlot(nSlot: 0 | 1 | 2): Weapon | undefined

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
     * Switches to a weapon.
     *
     * @param pWeapon the weapon to switch to.
     */
    SwitchToWeapon(pWeapon: Weapon): void

    /**
     * Needs testing.
     */
    SetGunGameImmunity(): unknown

    /**
     * Needs testing.
     */
    SetGunGameImmunityColor(): unknown

    /**
     * Gives an item to the player.
     *
     * @param sName the name of the item to give.
     */
    GiveNamedItem(sName: string): void

    /**
     * Gets the controller of the pawn.
     *
     * @returns the controller of the pawn.
     */
    GetCurrentController(): Controller

    /**
     * Gets the controller of the pawn.
     *
     * @returns the controller of the pawn.
     */
    GetOriginalController(): Controller

    /**
     * Gets the absolute origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetAbsOrigin(): [number, number, number]

    /**
     * Gets the origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetOrigin(): [number, number, number]

    /**
     * Gets the team number of the pawn.
     * 0 = Team Selection
     * 1 = Spectator
     * 2 = Terrorist
     * 3 = Counter-Terrorist
     *
     * @returns the team number.
     */
    GetTeamNumber(): 3 | 2 | 1 | 0

    /**
     * Sets the team of the pawn (This will kill the player).
     *
     * @param iTeamNum the team number to set the pawn to. 0 = Team Selection, 1 = Spectator, 2 = Terrorist, 3 = Counter-Terrorist
     */
    ChangeTeam(iTeamNum: 3 | 2 | 1 | 0): void

    /**
     * Gets the name of the pawn type.
     *
     * @returns the name of the pawn type.
     */
    GetClassName(): string
}

interface Controller {
    /**
     * Gets the pawn this controller controls.
     *
     * @returns the pawn of this Controller.
     */
    GetPlayer(): Pawn

    /**
     * Gets the observer of this controller.
     *
     * @returns the observer of this controller.
     */
    GetObserver(): Observer

    /**
     * Gets the score of the controller.
     *
     * @returns the score of the controller.
     */
    GetScore(): number

    /**
     * Adds score the to controller.
     *
     * @param nPoints the amount of score to add.
     */
    AddScore(nPoints: number): void

    /**
     * Get the weapon data of the players loadout slot.
     * 0 = weapon_knife_tactical
     * 1 = weapon_c4 for Ts and undefined for CTs
     * 2 = Starting Pistol
     * 3 = Other Pistols 1
     * 4 = Other Pistols 2
     * 5 = Other Pistols 3
     * 6 = Other Pistols 4
     * 8 = Mid tier 1
     * 9 = Mid tier 2
     * 10 = Mid tier 3
     * 11 = Mid tier 4
     * 12 = Mid tier 5
     * 14 = Rifles 1
     * 15 = Rifles 2
     * 16 = Rifles 3
     * 17 = Rifles 4
     * 18 = Rifles 5
     * 25 = weapon_shield
     * 26 = weapon_flashbang
     * 27 = weapon_smokegrenade
     * 28 = weapon_hegrenade
     * 29 = weapon_molotov for Ts and weapon_incgrenade for CTs
     * 30 = weapon_decoy
     * 32 = item_kevlar
     * 33 = item_assaultsuit
     * 34 = weapon_taser
     *
     * @param nSlot the slot of the weapon to get the data of.
     */
    GetWeaponDataForLoadoutSlot(nSlot: number): LoadoutWeaponData | undefined

    /**
     * Returns true if the controller is observing.
     *
     * @returns true if the controller is observing. false otherwise.
     */
    IsObserving(): boolean

    /**
     * Get the player slot of the controller.
     *
     * @returns the player slot of the controller.
     */
    GetPlayerSlot(): number

    /**
     * Returns true if the controller is a bot.
     *
     * @returns true if the controller is a bot. false otherwise.
     */
    IsFakeClient(): boolean

    /**
     * Gets the absolute origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetAbsOrigin(): [number, number, number]

    /**
     * Gets the origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetOrigin(): [number, number, number]

    /**
     * Gets the team number of the pawn.
     * 0 = Team Selection
     * 1 = Spectator
     * 2 = Terrorist
     * 3 = Counter-Terrorist
     *
     * @returns the team number.
     */
    GetTeamNumber(): 3 | 2 | 1 | 0

    /**
     * Sets the team of the pawn (This will kill the player).
     *
     * @param iTeamNum the team number to set the pawn to. 0 = Team Selection, 1 = Spectator, 2 = Terrorist, 3 = Counter-Terrorist
     */
    ChangeTeam(iTeamNum: 3 | 2 | 1 | 0): void

    /**
     * Gets the name of the entity.
     *
     * @returns the name of the entity.
     */
    GetClassName(): string
}

interface Observer {
    /**
     * Needs testing.
     */
    GetObserverMode(): number

    /**
     * Needs testing.
     */
    SetObserverMode(mode: number): unknown

    /**
     * Gets the controller of this observer.
     *
     * @returns the controller of this observer.
     */
    GetCurrentController(): Controller

    /**
     * Gets the absolute origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetAbsOrigin(): [number, number, number]

    /**
     * Gets the origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetOrigin(): [number, number, number]

    /**
     * Gets the team number of the pawn.
     * 0 = Team Selection
     * 1 = Spectator
     * 2 = Terrorist
     * 3 = Counter-Terrorist
     *
     * @returns the team number.
     */
    GetTeamNumber(): 3 | 2 | 1 | 0

    /**
     * Sets the team of the pawn (This will kill the player).
     *
     * @param iTeamNum the team number to set the pawn to. 0 = Team Selection, 1 = Spectator, 2 = Terrorist, 3 = Counter-Terrorist
     */
    ChangeTeam(iTeamNum: 3 | 2 | 1 | 0): void

    /**
     * Gets the name of the entity.
     *
     * @returns the name of the entity.
     */
    GetClassName(): string
}

interface Weapon {
    /**
     * Gets the loadout data for this weapon.
     *
     * @returns the loadout data for this weapon.
     */
    GetData(): LoadoutWeaponData

    /**
     * Gets the absolute origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetAbsOrigin(): [number, number, number]

    /**
     * Gets the origin of the entity.
     *
     * @returns an array of the x y z values.
     */
    GetOrigin(): [number, number, number]

    /**
     * Gets the team number of the pawn.
     * 0 = Team Selection
     * 1 = Spectator
     * 2 = Terrorist
     * 3 = Counter-Terrorist
     *
     * @returns the team number.
     */
    GetTeamNumber(): 3 | 2 | 1 | 0

    /**
     * Sets the team of the pawn (This will kill the player).
     *
     * @param iTeamNum the team number to set the pawn to. 0 = Team Selection, 1 = Spectator, 2 = Terrorist, 3 = Counter-Terrorist
     */
    ChangeTeam(iTeamNum: 3 | 2 | 1 | 0): void

    /**
     * Gets the name of the entity.
     *
     * @returns the name of the entity.
     */
    GetClassName(): string
}

interface LoadoutWeaponData {
    /**
     * Gets the name of the weapon.
     *
     * @returns the name of the weapon.
     */
    GetName(): number

    /**
     * Gets the type of the weapon.
     * 0 = knife
     * 1 = pistol
     * 2 = light machine gun
     * 3 = rifle
     * 4 = shotgun
     * 5 = sniper
     * 7 = c4
     * 9 = grenade
     * 10 = kevlar
     * 19 = shield
     *
     * @returns the type of the weapon.
     */
    GetType(): number

    /**
     * Gets the price of the weapon.
     *
     * @returns the price of the weapon.
     */
    GetPrice(): number
}

declare module "cspointscript" {
    export const Instance: Instance
}

declare module "server/cspointscript" {
    export const Instance: Instance
}
