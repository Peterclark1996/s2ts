#!/usr/bin/env node

import { start } from "./index"

const command = process.argv[2]

switch (command) {
    case "start":
        start()
        break
    default:
        console.log(`Unknown command: ${command}. Did you mean 'start'?`)
        break
}
