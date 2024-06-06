import chokidar from "chokidar"
import { readFileSync, writeFileSync } from "fs"
import path from "path"
import { compileToVts } from "./compile"

const watchDir = path.join(process.cwd(), "./scripts/vscripts")

const processFile = (filePath: string) => {
    if (!filePath.endsWith(".vts")) return

    const standardFilePath = filePath.replace(/[\\/]+/g, "/")

    console.log(`Compiling: ${path.basename(standardFilePath)}`)

    const data = readFileSync(standardFilePath).toString("utf-8")
    const compiledBuffer = compileToVts(data)

    const outputFilePath = standardFilePath.replace(".vts", ".vts_c").replace("/content/csgo_addons", "/game/csgo_addons")

    writeFileSync(outputFilePath, compiledBuffer)

    console.log(`Compiled: ${path.basename(outputFilePath)}`)
}

export const start = () => {
    chokidar
        .watch(watchDir, { persistent: true })
        .on("add", processFile)
        .on("change", processFile)
        .on("error", error => console.error(`Watcher error: ${error}`))

    console.log(`Watching for file changes in ${watchDir}`)
}
