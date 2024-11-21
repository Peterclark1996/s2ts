import { readFileSync } from "fs"
import path from "path"
import { processFileData } from "../src/cli"

test("I can compile a vts file and get a correctly formed vts_c file", async () => {
    const sourcePath = path.join(__dirname, "/resource/test.vts")
    const content = readFileSync(sourcePath).toString("utf-8")

    const actualBuffer = await processFileData(".", { name: "test.ts", path: "./test.ts", content })
    const actual = actualBuffer?.toString("utf-8")

    const expectedPath = path.join(__dirname, "/resource/test.vts_c")
    const expected = readFileSync(expectedPath).toString("utf-8")

    expect(actual).toBe(expected)
})

test("I can compile a vts typescript file and get a correctly formed vts_c javascript file", async () => {
    const sourcePath = path.join(__dirname, "/resource/test_withTypes.vts")
    const content = readFileSync(sourcePath).toString("utf-8")

    const actualBuffer = await processFileData(".", { name: "test.ts", path: "./test.ts", content })
    const actual = actualBuffer?.toString("utf-8")

    const expectedPath = path.join(__dirname, "/resource/test_withTypes.vts_c")
    const expected = readFileSync(expectedPath).toString("utf-8")

    expect(actual).toBe(expected)
})

test("I can compile a vts file and see the s2ts version in the header of the vts_c file", async () => {
    const sourcePath = path.join(__dirname, "/resource/test.vts")
    const content = readFileSync(sourcePath).toString("utf-8")

    const actualBuffer = await processFileData(".", { name: "test.ts", path: "./test.ts", content })
    const actual = actualBuffer?.toString("utf-8")

    expect(actual).toContain("// s2ts v0.0.0")
})

test("I can compile a vts file with public methods with args and get a correctly formed STAT header", async () => {
    const sourcePath = path.join(__dirname, "/resource/test_withPublicMethodArgs.vts")
    const content = readFileSync(sourcePath).toString("utf-8")

    const actualBuffer = await processFileData(".", { name: "test.ts", path: "./test.ts", content })
    const actual = actualBuffer?.toString("utf-8")

    const expectedPath = path.join(__dirname, "/resource/test_withPublicMethodArgs.vts_c")
    const expected = readFileSync(expectedPath).toString("utf-8")

    expect(actual).toBe(expected)
})
