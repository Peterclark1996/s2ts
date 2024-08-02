import chokidar from "chokidar"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import { compileVtsFile } from "./compile"

export const s2tsVersion = "0.0.0"

const sourcePathPart = "/content/csgo_addons"
const targetPathPart = "/game/csgo_addons"

export const start = (specifiedPath: string | undefined) => {
    const watchDir = standardisePath(getWatchDir(specifiedPath))

    if (!watchDir.includes(sourcePathPart)) {
        console.error(
            `The current path '${watchDir}' was expected to contain '${sourcePathPart}' but it did not. Check if you are running in the correct folder.`
        )
        return
    }

    if (!existsSync(watchDir)) {
        mkdirSync(watchDir)
    }

    chokidar
        .watch(watchDir, { persistent: true })
        .on("add", processFileAtPath)
        .on("change", processFileAtPath)
        .on("error", error => console.error(`Watcher error: ${error}`))

    console.log(`Watching for file changes in ${watchDir}`)
}

const processFileAtPath = (filePath: string) => {
    if (!filePath.endsWith(".vts") && !filePath.endsWith(".ts")) return

    const standardFilePath = standardisePath(filePath)

    const data = readFileSync(standardFilePath).toString("utf-8")

    const compiledBuffer = compileVtsFile(data)

    const outputFilePath = standardFilePath.replace(".vts", ".vts_c").replace(".ts", ".vts_c").replace(sourcePathPart, targetPathPart)

    mkdirSync(path.dirname(outputFilePath), { recursive: true })
    writeFileSync(outputFilePath, compiledBuffer)

    const now = new Date()
    console.log(`${now.toLocaleTimeString()} Compiled: ${path.basename(outputFilePath)}`)
}

const getWatchDir = (specifiedPath: string | undefined) => {
    if (specifiedPath === undefined) {
        return path.join(process.cwd(), "./scripts")
    }

    if (specifiedPath.endsWith("/scripts") || specifiedPath.endsWith("\\scripts")) {
        return specifiedPath
    }

    return path.join(specifiedPath, "./scripts")
}

const standardisePath = (fullPath: string) => fullPath.replace(/[\\/]+/g, "/")
