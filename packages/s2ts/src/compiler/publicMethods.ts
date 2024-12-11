export type PublicMethodDeclaration = { methodName: string; argType: "none" | "string" | "number" | "boolean" }

const hardcodeds2tsPublicMethods = [{ methodName: "s2ts-custom-output", argType: "string" }] as const

export const extractPublicMethods = (data: string): PublicMethodDeclaration[] => {
    const customPublicMethods: PublicMethodDeclaration[] = data
        .split("PublicMethod(")
        .slice(1)
        .map(publicMethodSection => {
            const publicMethodParts = publicMethodSection
                .split('"')
                .flatMap(part => part.split("=>"))
                .map(part => part.trim())

            const methodName = publicMethodParts[1]
            const methodArgType = publicMethodParts[2]?.split(":")[1]?.trim()?.replaceAll(")", "") ?? "none"

            if (methodName === undefined) {
                throw new Error("Invalid methodName in publicMethodParts array " + publicMethodParts)
            }

            if (methodArgType !== "none" && methodArgType !== "string" && methodArgType !== "number" && methodArgType !== "boolean") {
                throw new Error("Invalid methodArgType in publicMethodParts array " + publicMethodParts)
            }

            return { methodName, argType: methodArgType }
        })

    const hardcodedMethodNames: string[] = hardcodeds2tsPublicMethods.map(method => method.methodName)
    return [...customPublicMethods.filter(method => !hardcodedMethodNames.includes(method.methodName)), ...hardcodeds2tsPublicMethods]
}
