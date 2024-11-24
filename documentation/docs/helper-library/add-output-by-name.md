---
sidebar_position: 2
---

# addOutputByName

Target an entity based on its targetname and add an output to it.

```ts title="Add an output to a func_button so that when the button is pressed it opens a door entity"
import { Instance } from "cspointscript"
import { addOutputByName } from "s2ts/counter-strike"

Instance.PublicMethod("InputReceived", () => {
    addOutputByName("button", {
        outputName: "OnPressed",
        targetName: "door",
        viaThisInput: "Open",
        delay: 1
    })
})
```