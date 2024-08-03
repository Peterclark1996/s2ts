import * as rollup from "rollup"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import path from "path"

export const bundleImports = async (pathForProject: string, file: { name: string; code: string }): Promise<string> => {
    const virtualPlugin = {
        name: "virtual",
        resolveId: (source: string) => (source === file.name ? source : null),
        load: (id: string) => (id === file.name ? file.code : null)
    }

    const bundle = await rollup.rollup({
        input: file.name,
        plugins: [
            resolve({
                modulePaths: [path.join(pathForProject, "node_modules")]
            }),
            commonjs(),
            typescript({
                module: "ESNext",
                target: "ES2015"
            }),
            virtualPlugin
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
