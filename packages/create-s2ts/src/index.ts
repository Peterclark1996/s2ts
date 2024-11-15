#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs"
import path from "path"
import { s2tsmap } from "./s2tsmap"

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

    const mainScript = `/// <reference types="s2ts/types/cspointscript" />
import { Instance } from "cspointscript"
import { runServerCommand } from "s2ts/counter-strike"

Instance.Msg("Hello World!") // Runs when the script starts

Instance.PublicMethod("PublicFunc", () => {
    runServerCommand("say I just pressed the button!") // Runs when the script receives an input of "PublicFunc"
})`

    tryWriteFile(path.join(rootPath, "scripts/main.ts"), mainScript, "utf8")
    tryWriteFile(path.join(rootPath, "maps/s2tsmap.vmap"), s2tsmap, "base64")

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
