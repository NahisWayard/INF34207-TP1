export interface Process {
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