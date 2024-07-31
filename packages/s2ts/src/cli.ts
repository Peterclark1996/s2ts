#!/usr/bin/env node

import { start } from "./index"

const command = process.argv[2]
const argument = process.argv[3]

switch (command) {
    case "dev":
    case "start":
        start(argument)
        break
    default:
        console.log(`Unknown command: ${command}. Did you mean 'start'?`)
        break
}
