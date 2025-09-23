---
sidebar_position: 1
---

import { DocsOutdatedAlert } from '@site/src/components/DocsOutdatedAlert';

<DocsOutdatedAlert />

# 📝 Getting started 📝

:::info
While counter strike 2 has an interface to allow the running of javascript code to interact with the game engine (The successor to squirrel/lua vscripts), it currently isn't fully released/supported by Valve.

S2TS is a project that bundles and compiles TypeScript code into .vts_c files that can then run in counter strike 2. Everything here is specific to the S2TS project and might change, break or even become redundent as Valve continue to work on the TypeScript interface with the source 2 engine.
:::

## Installation
Run `npx create-s2ts@latest` at the root of your map folder. The folder should be something like `/Steam/steamapps/common/Counter-Strike Global Offensive/content/csgo_addons/<map-name>`. This will setup a node project with s2ts.
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

- While running, s2ts will look for any file updates to `.vts` and `.ts` files in your `/scripts/vscripts` folder at `Counter-Strike Global Offensive/content/csgo_addons/<map-name>/scripts/vscripts` and automatically compile then save them to `Counter-Strike Global Offensive/game/csgo_addons/<map-name>/scripts/vscripts`.

You can find an example TypeScript script at `/scripts/vscripts/main.ts`. Update and save this script while s2ts is running, and the script will be compiled. If you are running your map in counter strike, you must re-launch the map for this new script to take effect.

In hammer, you need to add a point_script entity that references your script. It should have a `targetname` key to allow other entities to trigger public methods in the script. It should also have a `script` key that references your script file. 
> [!IMPORTANT]
> Your script file path needs to have the `.vts` extension in hammer, even if it is a `.ts` file.

- Public functions can be declared, for example `Instance.PublicMethod("PublicFunc", () => {})` and then these can be called from hammer's input/output system by triggering an output to the point_script entity with the name of the public function in the "Via this input" field.

- Public functions can also take string parameters but must be declared with the correct type, for example `Instance.PublicMethod("PublicFunc", (input: string) => {})`. Input in this case would be the value specified in the "With a parameter override of" field.