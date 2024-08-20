import { ModuleKind, ScriptTarget, transpileModule } from "typescript"

export const transpileFromTypeScript = (source: string): string => {
    const result = transpileModule(source, {
        compilerOptions: {
            module: ModuleKind.ESNext,
            target: ScriptTarget.ES2015,
            removeComments: true,
            esModuleInterop: false,
            allowSyntheticDefaultImports: false
        }
    })
    return result.outputText
}
