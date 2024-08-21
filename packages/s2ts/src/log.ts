export const logger = {
    info: (message: string) => {
        const now = new Date()
        console.log(`${now.toLocaleTimeString()} ${message}`)
    },
    error: (message: string) => {
        const now = new Date()
        console.error(`${now.toLocaleTimeString()} ${message}`)
    }
}
