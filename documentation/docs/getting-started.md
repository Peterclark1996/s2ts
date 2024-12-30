---
sidebar_position: 1
---

# 📝 Getting started 📝

:::info
While counter strike 2 has an interface to allow the running of javascript code to interact with the game engine (The successor to squirrel/lua vscripts), it currently isn't fully released/supported by Valve.

S2TS is a project that compiles TypeScript code into .vts_c files that can then run in counter strike 2. Everything here is specific to the S2TS project and might change, break or even become redundent as Valve continue to work on the TypeScript interface with the source 2 engine.
:::

## Installation
Run `npx create-s2ts@latest` at the root of your map folder. The folder should be something like `/Steam/steamapps/common/Counter-Strike Global Offensive/content/csgo_addons/<map-name>`. This will setup a node project and create an example map.
```shell
npx create-s2ts@latest
```

Run the install:
```shell
npm install
```

## Using The Compiler
Once installed you can run with the start command:
```shell
npm run start
```

While running, s2ts will look for any file updates to `.vts` and `.ts` files in your `/scripts/vscripts` folder at `Counter-Strike Global Offensive/content/csgo_addons/<map-name>/scripts/vscripts` and automatically compile then save them to `Counter-Strike Global Offensive/game/csgo_addons/<map-name>/scripts/vscripts`.

You can find an example TypeScript script at `/scripts/vscripts/main.ts`. Update and save this script while s2ts is running, and the script will be compiled. If you are running your map in counter strike, you must re-compile the map for this new script to take effect.

## Utility Library Usage
S2TS also provides some utility functions. These can be imported into your script from `s2ts/counter-strike`. To use any of these functions you need to be using the `maps/s2tsmap.vmap` example map (Created as part of `create-s2ts` but can also be [downloaded here](https://github.com/Peterclark1996/s2ts/raw/refs/heads/main/packages/create-s2ts/assets/s2tsmap.vmap)). If you are not using the example map you must set up the required entities yourself to use the features of this library.