import { PublicMethodDeclaration } from "./publicMethods"

export const compileToVtsc = (data: string, publicMethods: PublicMethodDeclaration[]): Buffer => {
    const dataSize = Buffer.byteLength(data, "utf-8")
    const newData: number[] = []
    const statBytes: Uint8Array = serializeCs2kv3(publicMethods)
    const fileSize = dataSize + 52 + statBytes.length

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

    if (statBytes.length > 0) {
        newData.push(...intToBytes(dataSize + 8)) // offset
        newData.push(...intToBytes(statBytes.length)) // size
    } else {
        newData.push(...intToBytes(0)) // offset
        newData.push(...intToBytes(0)) // size
    }

    const dataBuffer = Buffer.from(data, "utf-8")
    for (const byte of dataBuffer) {
        newData.push(byte)
    }
    newData.push(...Array.from(statBytes))
    return Buffer.from(newData)
}

const serializeCs2kv3 = (publicMethods: PublicMethodDeclaration[]): Uint8Array => {
    const bytes: number[] = []
    let textForBytes = publicMethods.reduce((acc, method) => {
        return acc + `${method.methodName}\0${method.argType}\0`
    }, "publicMethods\0")

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
