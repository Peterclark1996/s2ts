import { ModuleKind, ScriptTarget, transpileModule, flattenDiagnosticMessageText } from "typescript"
import { VtsFile } from "./file"
import { logger } from "../log"

export const transpileFromTypeScript = (file: VtsFile): { output: string; success: boolean } => {
    const result = transpileModule(file.content, {
        compilerOptions: {
            module: ModuleKind.ESNext,
            target: ScriptTarget.ES2015,
            removeComments: true,
            esModuleInterop: false,
            allowSyntheticDefaultImports: false
        },
        reportDiagnostics: true
    })

    if (result.diagnostics && result.diagnostics.length > 0) {
        result.diagnostics.forEach(diagnostic => {
            const message = flattenDiagnosticMessageText(diagnostic.messageText, "\n")
            const now = new Date()
            if (diagnostic.file && diagnostic.start !== undefined) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
                logger.error(`Error in ${file.path} (${line + 1},${character + 1}): ${message}`)
            } else {
                logger.error(`Error in ${file.path}: ${message}`)
            }
        })
    }

    return {
        output: result.outputText,
        success: !result.diagnostics || result.diagnostics.length === 0
    }
}
