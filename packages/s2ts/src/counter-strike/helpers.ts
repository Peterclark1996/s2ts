export const uniqueId = (): string => {
    const generateSegment = (length: number): string => {
        let segment = ""
        for (let i = 0; i < length; i++) {
            const randomHex = Math.floor(Math.random() * 16).toString(16)
            segment += randomHex
        }
        return segment
    }

    return [
        generateSegment(8),
        generateSegment(4),
        "4" + generateSegment(3),
        (Math.floor(Math.random() * 4) + 8).toString(16) + generateSegment(3),
        generateSegment(12)
    ].join("-")
}
