import * as fs from "fs"
import * as path from "path"
import { compileToVts } from "../compile"

test("I can compile a vts file and get a correctly formed vts_c file", async () => {
    const sourcePath = path.join(__dirname, "/resource/test.vts")
    const data = fs.readFileSync(sourcePath).toString("utf-8")

    const actual = compileToVts(data).toString("utf-8")

    const expectedPath = path.join(__dirname, "/resource/test.vts_c")
    const expected = fs.readFileSync(expectedPath).toString("utf-8")

    expect(actual).toBe(expected)
})
