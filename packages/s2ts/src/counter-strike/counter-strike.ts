import { Instance } from "cspointscript"

export const runServerCommand = (command: string) => {
    Instance.EntFireAtName("s2ts-server-command", "Command", command)
}
