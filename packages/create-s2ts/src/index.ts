#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs"
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

    tryWriteFile(path.join(rootPath, "package.json"), packageJson, "utf8")

    tryCreateFolder(path.join(rootPath, "scripts"))
    tryCreateFolder(path.join(rootPath, "scripts/vscripts"))

    const mainScript = `/// <reference types="s2ts/types/cspointscript" />
import { Instance } from "cspointscript"

// Runs when the script starts
Instance.Msg("Hello World!") 

// Define a public method that can be called from the I/O system in the map.
Instance.PublicMethod("PublicFunc", () => {

    // Runs when the script receives an input of "PublicFunc"
    Instance.Msg("I just pressed the button!")

})`

    tryWriteFile(path.join(rootPath, "scripts/vscripts/main.ts"), mainScript, "utf8")

    console.log("Successfully created s2ts project")
}

const tryWriteFile = (fullPath: string, content: string, encoding: "utf8" | "base64") => {
    if (existsSync(fullPath)) {
        console.warn(`File '${fullPath}' already exists. If you want to recreate it, delete it manually then run 'npx create-s2ts@latest' again.`)
        return
    }

    writeFileSync(fullPath, content, { encoding })
}

const tryCreateFolder = (fullPath: string) => {
    if (existsSync(fullPath)) {
        return
    }

    mkdirSync(fullPath)
}

run()
