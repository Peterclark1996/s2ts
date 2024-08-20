import * as rollup from "rollup"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import path from "path"
import fs from "fs"
import { transpileFromTypeScript } from "./transpile"
import { VtsFile } from "../types/file"

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
        load: (id: string) => {
            if (id === file.name) return file.content
            if (fs.existsSync(id)) return transpileFromTypeScript(fs.readFileSync(id, "utf-8"))

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
            virtualPlugin,
            typescript({
                module: "ESNext",
                target: "ES2015"
            })
        ],
        external: ["cspointscript"],
        onwarn: (warning, warn) => {
            if (warning.code === "UNRESOLVED_IMPORT") {
                throw new Error(`Module "${warning.exporter}" could not be resolved in file "${warning.id}"`)
            }
            warn(warning)
        }
    })

    const { output } = await bundle.generate({
        format: "es",
        sourcemap: false
    })

    const outputCode = output[0].code
    return outputCode
}