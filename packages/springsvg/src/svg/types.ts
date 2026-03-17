export interface PathCommand {
    type: string
    values: number[]
}


export interface MorphTarget {
    commands: PathCommand[]
    raw: string

}