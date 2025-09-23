import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import path from "node:path"

const indexFilePath = path.join(process.cwd(), "dist/index.js")
const fileContent = readFileSync(indexFilePath, "utf8")
const fileContentWithVersion = fileContent.replace(`s2tsVersion = "0.0.0"`, `s2tsVersion = "${process.env.npm_package_version}"`)
writeFileSync(indexFilePath, fileContentWithVersion)

const fileToRemovePath = path.join(process.cwd(), "dist/postBuild.js")
if (existsSync(fileToRemovePath)) {
    unlinkSync(fileToRemovePath)
}
