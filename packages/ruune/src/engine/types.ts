export interface SpringConfig {
    stiffness: number
    damping: number
    mass: number

}


export interface SpringState {
    position: number
    velocity: number
    target: number

}

export interface SpringResult {
    value: number
    velocity: number
    settled: boolean

}



