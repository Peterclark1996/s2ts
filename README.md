# Counter Strike Typescript
This is a tool that allows you to create .vts typescript scripts for your counter strike maps and compiles them automatically to .vts_c files. You can also import the type defintions for the `Instance` object that these scripts need for interactions with your counter strike map.

## Installation & Usage
Create a new node project at the root of your map folder. The folder should be something like `/Steam/steamapps/common/Counter-Strike Global Offensive/content/csgo_addons/<map-name>`
```shell
npm init -y
```

Add s2ts
```shell
npm add -D s2ts
```

Run the install
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

Start running s2ts
```shell
npm run start
```

While running, s2ts will automatically look for any files in your scripts folder `Counter-Strike Global Offensive/content/csgo_addons/<map-name>/scripts`, and automatically compile then save them to `Counter-Strike Global Offensive/game/csgo_addons/<map-name>/scripts`.

To start writing a script, create a file with the `.vts` extension in your `/scripts` folder. The contents of this file should start with the types reference, and then an import for Instace from cspointscript. A script might look something like this:

```ts
/// <reference types="s2ts/types/cspointscript" />
import { Instance } from "cspointscript"

Instance.Msg("Hello World!") // Runs when the script starts

Instance.PublicMethod("PublicFunc", () => {
    Instance.Msg("Hello World!") // Runs when the script receives an input of "PublicFunc"
})
```

## Reference

[This repo](https://github.com/Ansimist/cs2typescript) for the structure of a vts_c file (Big thankyou)