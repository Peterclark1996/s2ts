import ts from "typescript"
import fs from "fs"
import doctrine from "doctrine"

const filePath = "../packages/s2ts/types/cspointscript.d.ts"
const fileContent = fs.readFileSync(filePath, "utf8")

const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS)

type InterfaceData = {
    interfaceName: string
    members: {
        name: string
        signature: string
        description: string
    }[]
}

const extractComments = (node: ts.Node): string | undefined => {
    const leadingCommentRanges = ts.getLeadingCommentRanges(fileContent, node.pos)
    if (!leadingCommentRanges) return undefined

    return leadingCommentRanges.map(range => fileContent.slice(range.pos, range.end)).join("\n")
}

const escapeForMarkdown = (text: string): string => {
    return text.replace(/\|/g, "\\|")
}

const tryParseJSDoc = (comment: string): string => {
    try {
        const parsed = doctrine.parse(comment, { unwrap: true })
        return parsed.description.replace(/\s+/g, " ").trim()
    } catch {
        return "Invalid JSDoc comment"
    }
}

const getMethodSignature = (method: ts.MethodSignature): string => {
    const methodName = method.name?.getText(sourceFile) ?? "Unnamed"
    const parameters = method.parameters
        .map(param => {
            const paramName = param.name.getText(sourceFile)
            const paramType = param.type ? param.type.getFullText(sourceFile).trim() : "any"
            return `${paramName}: ${paramType}`
        })
        .join(", ")

    const returnType = method.type ? method.type.getFullText(sourceFile).trim() : "void"
    return `${methodName}(${parameters}): ${returnType}`
}

const getMemberSignature = (member: ts.TypeElement): string => {
    if (ts.isMethodSignature(member)) {
        return getMethodSignature(member)
    } else if (ts.isPropertySignature(member)) {
        const propName = member.name?.getText(sourceFile) ?? "Unnamed"
        const propType = member.type ? member.type.getFullText(sourceFile).trim() : "any"
        return `${propName}: ${propType}`
    } else {
        return "Unknown member type"
    }
}

const interfaceNodes: ts.InterfaceDeclaration[] = []

function collectInterfaceDeclarations(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
        interfaceNodes.push(node)
    }
    ts.forEachChild(node, collectInterfaceDeclarations)
}

collectInterfaceDeclarations(sourceFile)

if (interfaceNodes.length === 0) {
    console.error("No interfaces found in the file. Check the file content or parsing logic.")
    process.exit(1)
}

const interfaceData: InterfaceData[] = interfaceNodes.map(interfaceNode => {
    const interfaceName = interfaceNode.name.text
    console.log(`Found interface: ${interfaceName}`)

    const members = interfaceNode.members.map(member => {
        const memberComment = extractComments(member) ?? ""
        const signature = getMemberSignature(member)

        return {
            name: `${interfaceName}.${member.name?.getText(sourceFile) ?? "Unnamed"}`,
            signature: `\`${escapeForMarkdown(signature)}\``,
            description: tryParseJSDoc(memberComment)
        }
    })

    return { interfaceName, members }
})

const markdownContent = interfaceData
    .map(({ interfaceName, members }) => {
        const tableHeader = `### ${interfaceName}\n\n| Name        | Signature                | Description        |\n|-------------|--------------------------|--------------------|`
        const tableBody = members.length
            ? members.map(({ name, signature, description }) => `| ${name} | ${signature} | ${description} |`).join("\n")
            : "| No members | - | - |"
        return `${tableHeader}\n${tableBody}\n`
    })
    .join("\n")

const fileHeader = `---
sidebar_position: 1
sidebar_label: Exported Classes
---

# Exported Classes

\`\`\`ts title="Example usage of the Instance class"
import { Instance } from "cspointscript"

Instance.Msg("Hello, world!")
\`\`\`

`

fs.writeFileSync("../documentation/docs/cspointscript/exported-classes.md", fileHeader + markdownContent)

console.log("Markdown tables generated in methods.md")
