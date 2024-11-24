---
sidebar_position: 2
---

# Instance.PublicMethod

## Definition

Define a function that can be called from hammers I/O system. Once defined, trigger an input on the point_script with the public method name in the "Via this input" field.

```ts title="Define a function thats callable via hammers I/O system"
import { Instance } from "cspointscript"

Instance.PublicMethod("PublicFunc", () => {
    // Runs when this scripts point_script entity receives an input of 'PublicFunc'
})
```

Example of the output on a func_button to trigger the above method:
![output_public_fun_example](img/output_public_fun_example.png "Example of an output triggering a public function on a point_script")

:::info
S2TS needs to know the name of the method at compile time. It does this by checking for the text inbetween the quotes defined as the first parameter, so its important that the name is defined as a single string and not created at run time.

```ts title="❌ Defined incorrectly"
const methodName = "InputReceived"
Instance.PublicMethod(methodName, () => {})
```
```ts title="❌ Defined incorrectly"
Instance.PublicMethod("Input" + "Received", () => {})
```
```ts title="✅ Defined correctly"
Instance.PublicMethod("InputReceived", () => {})
```
:::

## Arguments

Public functions can also take string parameters but must be declared with the correct type.
```ts title="Example of a public method with an input string"
import { Instance } from "cspointscript"

Instance.PublicMethod("InputReceived", (input: string) => {
  // 'input' will be whatever was specified in the "With a parameter override of" field
})
```

:::info
S2TS needs to know the argument type at compile time. It does this by checking for the text ": string" in your argument type. If that type is not found, the public method will get defined with no argument.

```ts title="❌ Defined incorrectly"
Instance.PublicMethod("InputReceived", (input) => {})
```
```ts title="❌ Defined incorrectly"
Instance.PublicMethod("InputReceived", (input: SomeCustomType) => {})
```
```ts title="✅ Defined correctly"
Instance.PublicMethod("InputReceived", (input: string) => {})
```
:::