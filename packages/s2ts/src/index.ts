import chokidar from "chokidar"
import { mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import { compileToVts } from "./compile"

const watchDir = path.join(process.cwd(), "./scripts").replace(/[\\/]+/g, "/")

const sourcePathPart = "/content/csgo_addons"
const targetPathPart = "/game/csgo_addons"

const processFile = (filePath: string) => {
    if (!filePath.endsWith(".vts")) return

    const standardFilePath = filePath.replace(/[\\/]+/g, "/")

    console.log(`Compiling: ${path.basename(standardFilePath)}`)

    const data = readFileSync(standardFilePath).toString("utf-8")
    const compiledBuffer = compileToVts(data)

    const outputFilePath = standardFilePath.replace(".vts", ".vts_c").replace(sourcePathPart, targetPathPart)

    mkdirSync(path.dirname(outputFilePath), { recursive: true })
    writeFileSync(outputFilePath, compiledBuffer)

    console.log(`Compiled: ${path.basename(outputFilePath)}`)
}

export const start = () => {
    if (!watchDir.includes(sourcePathPart)) {
        console.error(
            `The current path '${watchDir}' was expected to contain '${sourcePathPart}' but it did not. Check if you are running in the correct folder.`
        )
        return
    }

    mkdirSync(watchDir)

    chokidar
        .watch(watchDir, { persistent: true })
        .on("add", processFile)
        .on("change", processFile)
        .on("error", error => console.error(`Watcher error: ${error}`))

    console.log(`Watching for file changes in ${watchDir}`)
}
