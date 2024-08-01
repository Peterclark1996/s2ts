import { ModuleKind, ScriptTarget, transpileModule } from "typescript"
import { s2tsVersion } from "."

export const compileVtsFile = (data: string): Buffer => {
    const transpiledData = transpileTypeScript(data)
    const transpiledDataWithVersion = addS2tsVersion(transpiledData)
    return compileToVtsc(transpiledDataWithVersion)
}

const transpileTypeScript = (source: string): string => {
    const result = transpileModule(source, {
        compilerOptions: {
            module: ModuleKind.ESNext,
            target: ScriptTarget.ES2015,
            removeComments: true,
            esModuleInterop: false,
            allowSyntheticDefaultImports: false
        }
    })
    return result.outputText
}

const addS2tsVersion = (data: string): string => {
    return `// s2ts v${s2tsVersion}\n${data}`
}

const compileToVtsc = (data: string): Buffer => {
    const dataSize = Buffer.byteLength(data, "utf-8")
    const newData: number[] = []
    const StatBytes: Uint8Array = serializeCs2kv3(data)
    const fileSize = dataSize + 52 + StatBytes.length

    newData.push(...intToBytes(fileSize))
    newData.push(...intToBytes(131084)) // unknown constant
    newData.push(...intToBytes(8)) // version
    newData.push(...intToBytes(3)) // unknown constant
    newData.push(...Array.from(Buffer.from("RED2", "ascii")))
    newData.push(...intToBytes(0)) // offset
    newData.push(...intToBytes(0)) // size
    newData.push(...Array.from(Buffer.from("DATA", "ascii")))
    newData.push(...intToBytes(20)) // offset
    newData.push(...intToBytes(dataSize)) // size
    newData.push(...Array.from(Buffer.from("STAT", "ascii")))

    if (StatBytes.length > 0) {
        newData.push(...intToBytes(dataSize + 8)) // offset
        newData.push(...intToBytes(StatBytes.length)) // size
    } else {
        newData.push(...intToBytes(0)) // offset
        newData.push(...intToBytes(0)) // size
    }

    newData.push(...Array.from(Buffer.from(data, "utf-8")))
    newData.push(...Array.from(StatBytes))
    return Buffer.from(newData)
}

const serializeCs2kv3 = (data: string): Uint8Array => {
    const bytes: number[] = []
    const publicMethods: string[] = []
    const publicSplt = data.split("PublicMethod(")
    let textForBytes = "publicMethods\0"

    for (let i = 1; i < publicSplt.length; i++) {
        const value = publicSplt[i]
        if (value === undefined) throw new Error("Invalid value in publicSplt array at index " + i + " of " + publicSplt.length)

        const methodSplt = value.trim().split('"')
        const methodFirst = methodSplt[1]
        if (methodFirst === undefined) throw new Error("Invalid value in methodSplt array at index 1 of " + methodSplt)
        publicMethods.push(methodFirst)

        const methodSecond = methodSplt[2]
        if (methodSecond === undefined) throw new Error("Invalid value in methodSplt array at index 2 of " + methodSplt)
        const typeSplt = methodSecond.trim().split("*")
        if (typeSplt.length > 1) {
            const typeSplitValue = typeSplt[1]
            if (typeSplitValue === undefined) throw new Error("Invalid value in typeSplt array at index 1 of " + typeSplt)
            textForBytes += methodFirst + `\0${typeSplitValue.trim()}\0`
        } else {
            textForBytes += methodFirst + "\0none\0"
        }
    }

    textForBytes += "\t\t"
    for (let i = 0; i < publicMethods.length; i++) {
        textForBytes += "\u0006"
    }

    const numberStrings = 1 + publicMethods.length * 2
    const numberKeyValue = publicMethods.length
    const firstUnknownValue = 4 + numberKeyValue * 2
    const secondUnknownValue = 20 + textForBytes.length + numberKeyValue * 8
    const thirdUnkownValue = 20 + textForBytes.length + numberKeyValue * 8

    const addIntToBytes = (value: number) => bytes.push(...intToBytes(value))
    const addLongToBytes = (value: bigint) => bytes.push(...longToBytes(value))

    const initialByte = 4
    bytes.push(initialByte)
    bytes.push(...Buffer.from("3VK", "ascii"))
    addLongToBytes(BigInt("5086823378859464316")) // unknown constant
    addLongToBytes(BigInt("-1785799619110309201")) // unknown constant
    addIntToBytes(0) // type
    addLongToBytes(BigInt(0)) // unknown constant
    addLongToBytes(BigInt(firstUnknownValue))
    addIntToBytes(textForBytes.length)
    addIntToBytes(2) // unknown constant
    addIntToBytes(secondUnknownValue)
    addIntToBytes(thirdUnkownValue)
    addLongToBytes(BigInt(0)) // unknown constant
    addLongToBytes(BigInt(0)) // unknown constant
    addIntToBytes(numberStrings)
    addLongToBytes(BigInt(1)) // unknown constant
    addIntToBytes(numberKeyValue)

    for (let i = 0; i < numberKeyValue * 2; i++) {
        addIntToBytes(i + 1)
    }

    bytes.push(...Buffer.from(textForBytes, "ascii"))
    addIntToBytes(-1123072) // unknown constant

    return new Uint8Array(bytes)
}

const intToBytes = (value: number): number[] => {
    const buffer = Buffer.alloc(4)
    buffer.writeInt32LE(value)
    return Array.from(buffer)
}

const longToBytes = (value: bigint): number[] => {
    const buffer = Buffer.alloc(8)
    buffer.writeBigInt64LE(value)
    return Array.from(buffer)
}
