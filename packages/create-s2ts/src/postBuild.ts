import { readFileSync, unlinkSync, writeFileSync } from "fs"
import path from "path"

const indexFilePath = path.join(process.cwd(), "dist/index.js")
const fileContent = readFileSync(indexFilePath, "utf8")
const fileContentWithVersion = fileContent.replace("process.env.npm_package_version", `"${process.env.npm_package_version}"`)
writeFileSync(indexFilePath, fileContentWithVersion)

unlinkSync(path.join(process.cwd(), "dist/postBuild.js"))
