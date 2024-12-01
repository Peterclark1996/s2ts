---
sidebar_position: 1
sidebar_label: Exported Classes
---

# Exported Classes

```ts title="Example usage of the Instance class"
import { Instance } from "cspointscript"

Instance.Msg("Hello, world!")
```

### Instance

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| Instance.Msg | `Msg(message: string \| number \| boolean): void` | Sends a message to the server console. |
| Instance.PublicMethod | `PublicMethod(methodName: string, method: (input: T) => void): void` | Defines a public method that can be called from the I/O system in the map. To pass a value into the method, it must have a type specified. For example: `PublicMethod("MyMethod", (input: string) => { ... })` Right now no matter what the input type is declared as, it will always be a string. So it will require manual casting to the correct type. |
| Instance.GetGameTime | `GetGameTime(): number` | Gets the current game time in seconds from when the map started. |
| Instance.GameType | `GameType(): 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | Gets the current game type. 0 = Classic 1 = Gun Game 2 = Training 3 = Custom 4 = Cooperative 5 = Skirmish 6 = Free For All |
| Instance.GameMode | `GameMode(): 0 \| 1 \| 2 \| 3 \| 4` | Gets the current game mode. 0 = Casual (When gametype = 0), Arms Race (When gametype = 1), Training (When gametype = 2), Custom (When gametype = 3), Guardian (When gametype = 4), War Games (When gametype = 5), Danger Zone (When gametype = 6) 1 = Competitive (When gametype = 0), Demolition (When gametype = 1), Co-op Strike (When gametype = 4) 2 = Wingman (When gametype = 0), Deathmatch (When gametype = 1) 3 = Weapons Expert 4 = Training Day |
| Instance.IsWarmupPeriod | `IsWarmupPeriod(): boolean` | Returns true if the game is in a warmup period. |
| Instance.GetPlayerPawn | `GetPlayerPawn(playerId: string \| number \| boolean): Pawn \| undefined` | Gets a player Pawn handle by their player slot. |
| Instance.GetEntityOrigin | `GetEntityOrigin(entity: Entity \| Pawn): [number, number, number]` | Gets the origin of a entity. |
| Instance.EntFireAtName | `EntFireAtName(entityName: string, action: string, value: string \| number \| boolean, delay: number): void` | Triggers an action on an entity. |
| Instance.DebugScreenText | `DebugScreenText(message: string, flScreenX: number, flScreenY: number, nTextOffset: number, flDuration: number, color: unknown): void` | Prints a message to the screen. |
| Instance.EntFireBroadcast | `EntFireBroadcast(target: string, operation: string, value: string \| number \| boolean, delay: number): void` | Triggers an action on an entity. |
| Instance.InitialActivate | `InitialActivate(func: () => void): void` | Runs a function once the script as finished loading. |

### ClientInstance

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| ClientInstance.SetNextClientThink | `SetNextClientThink(number: number): void` | Needs testing. |
| ClientInstance.ClientThink | `ClientThink(func: () => void): void` | Needs testing. |

### Entity

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| Entity.GetAbsOrigin | `GetAbsOrigin(): [number, number, number]` | Gets the absolute origin of the entity. |
| Entity.GetOrigin | `GetOrigin(): [number, number, number]` | Gets the origin of the entity. |
| Entity.GetTeamNumber | `GetTeamNumber(): 3 \| 2 \| 1 \| 0` | Gets the team number of the pawn. 0 = Team Selection 1 = Spectator 2 = Terrorist 3 = Counter-Terrorist |

### Pawn

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| Pawn.FindWeapon | `FindWeapon(sWeaponName: string): Weapon \| undefined` | Finds a weapon by name. |
| Pawn.FindWeaponBySlot | `FindWeaponBySlot(nSlot: 0 \| 1 \| 2): Weapon \| undefined` | Finds a weapon by slot. |
| Pawn.GetActiveWeapon | `GetActiveWeapon(): Weapon` | Gets the currently active weapon. |
| Pawn.DestroyWeapon | `DestroyWeapon(pWeapon: Weapon): void` | Destroys the weapon. |
| Pawn.DestroyWeapons | `DestroyWeapons(): void` | Destroys all weapons apart from the knife. |
| Pawn.SwitchToWeapon | `SwitchToWeapon(pWeapon: Weapon): void` | Switches to a weapon. |
| Pawn.SetGunGameImmunity | `SetGunGameImmunity(): unknown` | Needs testing. |
| Pawn.SetGunGameImmunityColor | `SetGunGameImmunityColor(): unknown` | Needs testing. |
| Pawn.GiveNamedItem | `GiveNamedItem(sName: string): void` | Gives an item to the player. |
| Pawn.GetCurrentController | `GetCurrentController(): Controller` | Gets the controller of the pawn. |
| Pawn.GetOriginalController | `GetOriginalController(): Controller` | Gets the controller of the pawn. |
| Pawn.GetAbsOrigin | `GetAbsOrigin(): [number, number, number]` | Gets the absolute origin of the entity. |
| Pawn.GetOrigin | `GetOrigin(): [number, number, number]` | Gets the origin of the entity. |
| Pawn.GetTeamNumber | `GetTeamNumber(): 3 \| 2 \| 1 \| 0` | Gets the team number of the pawn. 0 = Team Selection 1 = Spectator 2 = Terrorist 3 = Counter-Terrorist |
| Pawn.ChangeTeam | `ChangeTeam(iTeamNum: 3 \| 2 \| 1 \| 0): void` | Sets the team of the pawn (This will kill the player). |
| Pawn.GetClassName | `GetClassName(): string` | Gets the name of the pawn type. |

### Controller

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| Controller.GetPlayer | `GetPlayer(): Pawn` | Gets the pawn this controller controls. |
| Controller.GetObserver | `GetObserver(): Observer` | Gets the observer of this controller. |
| Controller.GetScore | `GetScore(): number` | Gets the score of the controller. |
| Controller.AddScore | `AddScore(nPoints: number): void` | Adds score the to controller. |
| Controller.GetWeaponDataForLoadoutSlot | `GetWeaponDataForLoadoutSlot(nSlot: number): LoadoutWeaponData \| undefined` | Get the weapon data of the players loadout slot. 0 = weapon_knife_tactical 1 = weapon_c4 for Ts and undefined for CTs 2 = Starting Pistol 3 = Other Pistols 1 4 = Other Pistols 2 5 = Other Pistols 3 6 = Other Pistols 4 8 = Mid tier 1 9 = Mid tier 2 10 = Mid tier 3 11 = Mid tier 4 12 = Mid tier 5 14 = Rifles 1 15 = Rifles 2 16 = Rifles 3 17 = Rifles 4 18 = Rifles 5 25 = weapon_shield 26 = weapon_flashbang 27 = weapon_smokegrenade 28 = weapon_hegrenade 29 = weapon_molotov for Ts and weapon_incgrenade for CTs 30 = weapon_decoy 32 = item_kevlar 33 = item_assaultsuit 34 = weapon_taser |
| Controller.IsObserving | `IsObserving(): boolean` | Returns true if the controller is observing. |
| Controller.GetPlayerSlot | `GetPlayerSlot(): number` | Get the player slot of the controller. |
| Controller.IsFakeClient | `IsFakeClient(): boolean` | Returns true if the controller is a bot. |
| Controller.GetAbsOrigin | `GetAbsOrigin(): [number, number, number]` | Gets the absolute origin of the entity. |
| Controller.GetOrigin | `GetOrigin(): [number, number, number]` | Gets the origin of the entity. |
| Controller.GetTeamNumber | `GetTeamNumber(): 3 \| 2 \| 1 \| 0` | Gets the team number of the pawn. 0 = Team Selection 1 = Spectator 2 = Terrorist 3 = Counter-Terrorist |
| Controller.ChangeTeam | `ChangeTeam(iTeamNum: 3 \| 2 \| 1 \| 0): void` | Sets the team of the pawn (This will kill the player). |
| Controller.GetClassName | `GetClassName(): string` | Gets the name of the entity. |

### Observer

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| Observer.GetObserverMode | `GetObserverMode(): number` | Needs testing. |
| Observer.SetObserverMode | `SetObserverMode(mode: number): unknown` | Needs testing. |
| Observer.GetCurrentController | `GetCurrentController(): Controller` | Gets the controller of this observer. |
| Observer.GetAbsOrigin | `GetAbsOrigin(): [number, number, number]` | Gets the absolute origin of the entity. |
| Observer.GetOrigin | `GetOrigin(): [number, number, number]` | Gets the origin of the entity. |
| Observer.GetTeamNumber | `GetTeamNumber(): 3 \| 2 \| 1 \| 0` | Gets the team number of the pawn. 0 = Team Selection 1 = Spectator 2 = Terrorist 3 = Counter-Terrorist |
| Observer.ChangeTeam | `ChangeTeam(iTeamNum: 3 \| 2 \| 1 \| 0): void` | Sets the team of the pawn (This will kill the player). |
| Observer.GetClassName | `GetClassName(): string` | Gets the name of the entity. |

### Weapon

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| Weapon.GetData | `GetData(): LoadoutWeaponData` | Gets the loadout data for this weapon. |
| Weapon.GetAbsOrigin | `GetAbsOrigin(): [number, number, number]` | Gets the absolute origin of the entity. |
| Weapon.GetOrigin | `GetOrigin(): [number, number, number]` | Gets the origin of the entity. |
| Weapon.GetTeamNumber | `GetTeamNumber(): 3 \| 2 \| 1 \| 0` | Gets the team number of the pawn. 0 = Team Selection 1 = Spectator 2 = Terrorist 3 = Counter-Terrorist |
| Weapon.ChangeTeam | `ChangeTeam(iTeamNum: 3 \| 2 \| 1 \| 0): void` | Sets the team of the pawn (This will kill the player). |
| Weapon.GetClassName | `GetClassName(): string` | Gets the name of the entity. |

### LoadoutWeaponData

| Name        | Signature                | Description        |
|-------------|--------------------------|--------------------|
| LoadoutWeaponData.GetName | `GetName(): number` | Gets the name of the weapon. |
| LoadoutWeaponData.GetType | `GetType(): number` | Gets the type of the weapon. 0 = knife 1 = pistol 2 = light machine gun 3 = rifle 4 = shotgun 5 = sniper 7 = c4 9 = grenade 10 = kevlar 19 = shield |
| LoadoutWeaponData.GetPrice | `GetPrice(): number` | Gets the price of the weapon. |
