#!/usr/bin/env node

import chokidar from "chokidar"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import { addS2tsVersion } from "./compiler/version"
import { compileToVtsc } from "./compiler/compile"
import { transpileFromTypeScript } from "./compiler/transpile"
import { bundleImports } from "./compiler/rollup"
import { VtsFile } from "./compiler/file"
import { logger } from "./log"

export const s2tsVersion = "0.0.0"

const sourcePathPart = "/content/csgo_addons"
const targetPathPart = "/game/csgo_addons"

const start = (specifiedPath: string | undefined) => {
    const projectDir = standardisePath(specifiedPath ?? process.cwd())
    const watchDir = standardisePath(path.join(projectDir, "./scripts"))

    if (!watchDir.includes(sourcePathPart)) {
        logger.error(
            `The current path '${watchDir}' was expected to contain '${sourcePathPart}' but it did not. Check if you are running in the correct folder.`
        )
        return
    }

    if (!existsSync(watchDir)) {
        mkdirSync(watchDir)
    }

    chokidar
        .watch(watchDir, { persistent: true })
        .on("add", filePath => processFileAtPath({ project: projectDir, file: filePath }))
        .on("change", filePath => processFileAtPath({ project: projectDir, file: filePath }))
        .on("error", error => logger.error(`Watcher error: ${error}`))

    logger.info(`Watching for file changes in ${watchDir}`)
}

const processFileAtPath = async (pathFor: { project: string; file: string }) => {
    if (!pathFor.file.endsWith(".vts") && !pathFor.file.endsWith(".ts")) return

    const standardFilePath = standardisePath(pathFor.file)

    try {
        const compiledBuffer = await processFileData(pathFor.project, {
            name: path.basename(standardFilePath),
            path: standardFilePath,
            content: readFileSync(standardFilePath).toString("utf-8")
        })

        if (!compiledBuffer) return

        const outputFilePath = standardFilePath.replace(".vts", ".vts_c").replace(".ts", ".vts_c").replace(sourcePathPart, targetPathPart)
        mkdirSync(path.dirname(outputFilePath), { recursive: true })
        writeFileSync(outputFilePath, new Uint8Array(compiledBuffer))

        logger.info(`Compiled: ${path.basename(outputFilePath)}`)
    } catch (error) {
        logger.error(`Unhandled error in s2ts: ${error}`)
    }
}

export const processFileData = async (pathForProject: string, file: VtsFile) => {
    const transpiledResult = transpileFromTypeScript(file)
    if (!transpiledResult.success) return

    const bundledData = await bundleImports(pathForProject, { ...file, content: transpiledResult.output })
    const bundledDataWithVersion = addS2tsVersion(bundledData)
    return compileToVtsc(bundledDataWithVersion)
}

const standardisePath = (fullPath: string) => fullPath.replace(/[\\/]+/g, "/")

const command = process.argv[2]
const argument = process.argv[3]

switch (command) {
    case "dev":
    case "start":
        start(argument)
        break
    default:
        console.log(`Unknown command: ${command}. Did you mean 'start'?`)
        break
}
