# Counter Strike Typescript Compiler
This is a tool that allows you to create .vts typescript scripts for your counter strike maps and compile them automatically to .vts_c files. You can also import the type defintions for the `Instance` object in your scripts.

## Installation
<details>
  <summary>Automatic (Recommended)</summary>

Run `npx create-s2ts` at the root of your map folder. The folder should be something like `/Steam/steamapps/common/Counter-Strike Global Offensive/content/csgo_addons/<map-name>`
```shell
npx create-s2ts
```

Run the install:
```shell
npm install
```

</details>

<details>
  <summary>Manual (Not recommended)</summary>

Create a new node project at the root of your map folder. The folder should be something like `/Steam/steamapps/common/Counter-Strike Global Offensive/content/csgo_addons/<map-name>`
```shell
npm init -y
```

Add s2ts:
```shell
npm add -D s2ts
```

Run the install:
```shell
npm install
```

Add s2ts start to your package.json scripts section. Your package.json should look something like this:
```ts
{
    ...
    "scripts": {
        "start": "s2ts start"
    },
    ...
}
```

</details>

## Usage
Once installed you can run with the start command:
```shell
npm run start
```

While running, s2ts will look for any file updates in your scripts folder at `Counter-Strike Global Offensive/content/csgo_addons/<map-name>/scripts`, and automatically compile then save them to `Counter-Strike Global Offensive/game/csgo_addons/<map-name>/scripts`.

To start writing a script, create a file with the `.vts` extension in your `/scripts` folder. The contents of this file should start with the types reference, and then an import for Instance from cspointscript. A script might look something like this:

```ts
/// <reference types="s2ts/types/cspointscript" />
import { Instance } from "cspointscript"

Instance.Msg("Hello World!") // Runs when the script starts

Instance.PublicMethod("PublicFunc", () => {
    Instance.Msg("Hello World!") // Runs when the script receives an input of "PublicFunc"
})
```

In hammer, you need to add a point_script entity that references your script. It should have a `targetname` key to allow other entities to trigger public methods in the script. It should also have a `script` key that references your script file.
![point_script_example](point_script_example.png "Example of a point_script to load a helloworld.vts script")

## Reference

[This repo](https://github.com/Ansimist/cs2typescript) for the structure of a vts_c file (Big thankyou)