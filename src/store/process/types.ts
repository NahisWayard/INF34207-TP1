export enum OperationType {
    InputOutput = 0,
    Calc = 1
}

export interface Process {
    name: string
    priority: number
    threadCount: number
    operations: OperationType[][]
}

export interface RamState {
    processes: Process[]
}

export const ADD_PROCESS = 'ADD_PROCESS'
export const DEL_PROCESS = 'DEL_PROCESS'

interface AddProcessAction {
    type: typeof ADD_PROCESS
    payload: Process
}

interface RemoveProcessAction {
    type: typeof DEL_PROCESS
    payload: number
}

export type RamActionTypes = AddProcessAction | RemoveProcessAction