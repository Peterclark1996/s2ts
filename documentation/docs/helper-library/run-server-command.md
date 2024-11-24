---
sidebar_position: 1
---

# runServerCommand

Run a console command on the server.

```ts title="Run a server command"
import { Instance } from "cspointscript"
import { runServerCommand } from "s2ts/counter-strike"

Instance.PublicMethod("InputReceived", () => {
    runServerCommand("say I said this via TypeScript")
})
```

```ts title="Set server settings at the start of the game"
import { Instance } from "cspointscript"
import { runServerCommand } from "s2ts/counter-strike"

Instance.InitialActivate(() => {
    runServerCommand("mp_roundtime 60")
    runServerCommand("mp_freezetime 1")
    runServerCommand("mp_team_intro_time 0")
    runServerCommand("sv_infinite_ammo 1")
    runServerCommand("mp_force_pick_time 0")
})
```