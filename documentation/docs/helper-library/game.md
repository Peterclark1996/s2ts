---
sidebar_position: 4
---

# game

The `game` object lets you trigger functions when specific game events happen, trigger functions every game tick, and trigger functions with specified delays.

## game.on

Listen to game events and run a function when that event is fired.

:::warning
Most events are currently not implimented yet.
:::

```ts title="Trigger a function on the weapon_fire event"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.on("weapon_fire", () => {
    // Do something when someone fires their gun
})
```

## game.onTick

Runs a function every game tick (64 times a second)

```ts title="Run a function every game tick"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.onTick(() => {
    // Do something every game tick
})
```

## game.runNextTick

Runs a function on the next game tick

```ts title="Run a function on the next game tick"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.runNextTick(() => {
    // Do something next game tick
})
```

## game.runAfterDelayTicks

Runs a function after a delay of ticks

```ts title="Run a function after a delay of ticks"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.runAfterDelayTicks(() => {
    // Do something after 128 ticks (2 seconds)
}, 128)
```

## game.runAfterDelaySeconds

Runs a function after a delay in seconds

```ts title="Run a function after a delay in seconds"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.runAfterDelaySeconds(() => {
    // Do something after 2.5 seconds (160 ticks)
}, 2.5)
```