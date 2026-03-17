import { MorphTarget, PathCommand } from "./types";

export function parse(d: string): MorphTarget {
    const matches = d.matchAll(/([MLHVCSQTAZmlhvcsqtaz])([^MLHVCSQTAZmlhvcsqtaz]*)/g)
    const commands: PathCommand[] = []

    for (const match of matches) {
        const type = match[1]!
        const values = match[2]?.trim().split(/\s+|,/).filter(Boolean).map(Number)!
        commands.push({type, values})
    }

    return {commands, raw: d}

}

export function serialize(commands: PathCommand[]): string {
   return commands.map(cmd => `${cmd.type} ${cmd.values.join(" ")}` 
    ).join(" ")
}


function toAbsolute(commands: PathCommand[]): PathCommand[] {
    let x = 0
    let y = 0
    let startX = 0
    let startY = 0

    return commands.map(cmd => {
        switch(cmd.type) {
            case "M": 
            x = cmd.values[0]!
            y = cmd.values[1]!
            startX = x
            startY = y
            return cmd

            case "m":
            x = x + cmd.values[0]!
            y = y + cmd.values[1]!
            startX = x
            startY = y
            return ({type: 'M', values: [x,y]})

            case "L":
            x = cmd.values[0]!
            y = cmd.values[1]!
            return cmd

            case "l":
            x = x + cmd.values[0]!
            y = y + cmd.values[1]!
            return ({type: 'L', values: [x,y]})

            case "H":
            x = cmd.values[0]!
            return cmd

            case "h":
            x = x + cmd.values[0]!
            return ({type: 'H', values: [x]})

            case "V":
            y = cmd.values[0]!
            return cmd

            case "v":
            y = y + cmd.values[0]!
            return ({type: 'V', values: [y]})

            case "C":
            x = cmd.values[4]!
            y = cmd.values[5]!
            return cmd

            case "c":
            const x1 = x + cmd.values[0]!
            const y1 = y + cmd.values[1]!
            const x2 = x + cmd.values[2]!
            const y2 = y + cmd.values[3]!
            const ex = x + cmd.values[4]!
            const ey = y + cmd.values[5]!
            x = ex
            y = ey
            return { type: 'C', values: [x1, y1, x2, y2, ex, ey] }

            case "Z":
            x = startX
            y = startY
            return cmd;

            case "z":
            x = startX
            y = startY
            return { type: 'Z', values: [] }


            default: 
            return cmd
        } 
    })
}
