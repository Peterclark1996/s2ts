#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

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

    const mainScript = `import { Instance } from "cs_script/point_script"

// Runs when the script starts
Instance.Msg("Hello World!") // Print "Hello World!" to the console
Instance.ServerCommand("say Hello World!") // Print "Hello World!" to the chat
`

    tryWriteFile(path.join(rootPath, "scripts/vscripts/main.ts"), mainScript, "utf8")

    const definitionFile = `/// <reference types="s2ts/types/point_script" />`
    tryWriteFile(path.join(rootPath, "scripts/vscripts/point_script.d.ts"), definitionFile, "utf8")

    const tsconfigJson = `{
    "compilerOptions": {
        "target": "ES2022",
        "useDefineForClassFields": true,
        "lib": ["ES2022"],
        "module": "ESNext",
        "skipLibCheck": true,

        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "verbatimModuleSyntax": true,
        "moduleDetection": "force",
        "noEmit": true,

        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "erasableSyntaxOnly": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,
        "noUncheckedIndexedAccess": true,
    },
    "include": ["scripts/vscripts"]
}`
    tryWriteFile(path.join(rootPath, "tsconfig.json"), tsconfigJson, "utf8")

    const gitignore = `/node_modules
/scripts/vscripts/build`
    tryWriteFile(path.join(rootPath, ".gitignore"), gitignore, "utf8")

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
