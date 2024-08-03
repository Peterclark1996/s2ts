import chokidar from "chokidar"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import { addS2tsVersion } from "./logic/version"
import { compileToVtsc } from "./logic/compile"
import { transpileToTypeScript } from "./logic/transpile"
import { bundleImports } from "./logic/rollup"

export const s2tsVersion = "0.0.0"

const sourcePathPart = "/content/csgo_addons"
const targetPathPart = "/game/csgo_addons"

export const start = (specifiedPath: string | undefined) => {
    const projectDir = standardisePath(specifiedPath ?? process.cwd())
    const watchDir = standardisePath(path.join(projectDir, "./scripts"))

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
        .on("add", filePath => processFileAtPath({ project: projectDir, file: filePath }))
        .on("change", filePath => processFileAtPath({ project: projectDir, file: filePath }))
        .on("error", error => console.error(`Watcher error: ${error}`))

    console.log(`Watching for file changes in ${watchDir}`)
}

export const processFileData = async (pathForProject: string, file: { name: string; data: string }) => {
    const transpiledData = transpileToTypeScript(file.data)
    const bundledData = await bundleImports(pathForProject, { name: file.name, code: transpiledData })
    const bundledDataWithVersion = addS2tsVersion(bundledData)
    return compileToVtsc(bundledDataWithVersion)
}

const processFileAtPath = async (pathFor: { project: string; file: string }) => {
    if (!pathFor.file.endsWith(".vts") && !pathFor.file.endsWith(".ts")) return

    const standardFilePath = standardisePath(pathFor.file)

    const compiledBuffer = await processFileData(pathFor.project, {
        name: path.basename(standardFilePath),
        data: readFileSync(standardFilePath).toString("utf-8")
    })

    const outputFilePath = standardFilePath.replace(".vts", ".vts_c").replace(".ts", ".vts_c").replace(sourcePathPart, targetPathPart)
    mkdirSync(path.dirname(outputFilePath), { recursive: true })
    writeFileSync(outputFilePath, compiledBuffer)

    const now = new Date()
    console.log(`${now.toLocaleTimeString()} Compiled: ${path.basename(outputFilePath)}`)
}

const standardisePath = (fullPath: string) => fullPath.replace(/[\\/]+/g, "/")
