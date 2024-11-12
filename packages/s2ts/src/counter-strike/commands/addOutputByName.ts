import { runServerCommand } from "./util"

export const addOutputByName = (
    entityName: string,
    output: {
        outputName: string
        targetName: string
        inputName: string
        parameter?: string | number
        delay?: number
        maxTimesToFire?: number
    }
) => {
    const command = `ent_fire ${entityName} addoutput ${output.outputName}>${output.targetName}>${output.inputName}>${output.parameter ?? ""}>${
        output.delay ?? ""
    }>${output.maxTimesToFire ?? ""}`
    runServerCommand(command)
}
