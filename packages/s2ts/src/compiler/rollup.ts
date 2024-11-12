import * as rollup from "rollup"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import path from "path"
import fs from "fs"
import { transpileFromTypeScript } from "./transpile"
import { VtsFile } from "./file"

const supportedExtensions = [".js", ".ts", ".vts"]

export const bundleImports = async (pathForProject: string, file: VtsFile): Promise<string> => {
    const virtualPlugin = {
        name: "virtual",
        resolveId: (source: string, importer: string | undefined) => {
            if (source === file.name) return source
            if (!importer) return null

            for (const ext of supportedExtensions) {
                const resolvedPath = path.join(file.path.substring(0, file.path.lastIndexOf("/")), source) + ext
                if (fs.existsSync(resolvedPath)) {
                    return resolvedPath
                }
            }

            return null
        },
        load: (path: string) => {
            if (path === file.name) return file.content
            if (fs.existsSync(path)) {
                const transpiledResult = transpileFromTypeScript({
                    name: path,
                    path,
                    content: fs.readFileSync(path, "utf-8")
                })

                if (transpiledResult.success) return transpiledResult.output
            }

            return null
        }
    }

    const bundle = await rollup.rollup({
        input: file.name,
        plugins: [
            resolve({
                modulePaths: [path.join(pathForProject, "node_modules")],
                extensions: supportedExtensions
            }),
            commonjs(),
            virtualPlugin
        ],
        external: ["cspointscript"]
    })

    const { output } = await bundle.generate({
        format: "es",
        sourcemap: false
    })

    const outputCode = output[0].code
    return outputCode
}
