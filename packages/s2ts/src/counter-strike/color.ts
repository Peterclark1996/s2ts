type Color = {
    red: number
    green: number
    blue: number
}
const Color = (red: number, green: number, blue: number): Color => ({ red, green, blue })
Color.red = { red: 255, green: 0, blue: 0 }
Color.green = { red: 0, green: 255, blue: 0 }
Color.blue = { red: 0, green: 0, blue: 255 }
Color.white = { red: 255, green: 255, blue: 255 }
Color.black = { red: 0, green: 0, blue: 0 }
Color.grey = { red: 128, green: 128, blue: 128 }
Color.yellow = { red: 255, green: 255, blue: 0 }
Color.cyan = { red: 0, green: 255, blue: 255 }
Color.magenta = { red: 255, green: 0, blue: 255 }
Color.orange = { red: 255, green: 165, blue: 0 }
Color.purple = { red: 128, green: 0, blue: 128 }
Color.pink = { red: 255, green: 192, blue: 203 }
Color.brown = { red: 165, green: 42, blue: 42 }
Color.random = () => Color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255))
Color.format = (color: Color) => `${color.red} ${color.green} ${color.blue}`

export { Color }
