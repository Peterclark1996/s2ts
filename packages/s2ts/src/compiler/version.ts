import { s2tsVersion } from "../cli"

export const addS2tsVersion = (data: string): string => {
    return `// s2ts v${s2tsVersion}\n${data}`
}
