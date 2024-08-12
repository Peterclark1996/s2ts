#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "fs"
import path from "path"

const rootPath = process.cwd().replace(/[\\/]+/g, "/")
const sourcePathPart = "/content/csgo_addons"
const s2tsVersion = "0.0.0"

const run = () => {
    console.log(`Creating s2ts project at ${rootPath}`)

    if (!rootPath.includes(sourcePathPart)) {
        console.error(
            `The current path '${rootPath}' was expected to contain '${sourcePathPart}' but it did not. Check if you are running in the correct folder.`
        )
        return
    }

    const packageJson = JSON.stringify(
        {
            name: path.basename(rootPath),
            version: "1.0.0",
            scripts: {
                start: "s2ts start"
            },
            dependencies: {
                s2ts: s2tsVersion
            }
        },
        null,
        4
    )

    writeFileSync(path.join(rootPath, "package.json"), packageJson)

    mkdirSync(path.join(rootPath, "scripts"))

    const exampleScript = `/// <reference types="s2ts/types/cspointscript" />
import { Instance } from "cspointscript"

Instance.Msg("Hello World!") // Runs when the script starts

Instance.PublicMethod("PublicFunc", () => {
    Instance.Msg("Hello World!") // Runs when the script receives an input of "PublicFunc"
})`

    writeFileSync(path.join(rootPath, "scripts/example.ts"), exampleScript)

    console.log("Successfully created s2ts project")
}

run()
