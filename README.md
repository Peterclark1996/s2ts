# Source 2 TypeScript
A counter strike 2 quick typescript project setup with bundler that automatically bundles all `.ts` typescript files.

> [!NOTE]  
> Now valve have officaily supported their JS interface, this project has been stripped back to a glorified typescript+rollup setup. But if you want all the needed tooling with two single line commands, then here it is!

## Installation
Run `npx create-s2ts@latest` at the root of your map folder. The folder should be something like `/Steam/steamapps/common/Counter-Strike Global Offensive/content/csgo_addons/<map-name>`. This will setup a node project and create an example script.
```shell
npx create-s2ts@latest
```

Run the install.
```shell
npm install
```

## Usage
Once installed you can run with the start command:
```shell
npm run start
```

- While running, s2ts will look for any file updates to `.ts` files in your `/scripts/vscripts` folder and bundle them into a js file with no external dependencies so they can run in counter strike.

- While the workshop tools are running, the bundled `.js` files in the build folder will be compiled and accessable in your `point_script` entity.

- Documentation for [Valves scripting API](https://developer.valvesoftware.com/wiki/Counter-Strike_2_Workshop_Tools/Scripting_API)