export enum OperationType {
    INPUT_OUTPUT,
    CALC
}

export enum OperationStatus {
    IDLE,
    RUNNING,
    DONE
}

export interface Operation {
    type: OperationType
    status: OperationStatus
}

export enum ProcessStatus {
    NEW = "New",
    READY = "Ready",
    RUNNING = "Running",
    WAITING = "Waiting",
    TERMINATED = "Terminated"
}

export interface Process {
    name: string
    priority: number
    threadCount: number
    status: ProcessStatus
    operations: Operation[][]
}

export interface RamState {
    processes: Process[]
}

export const ADD_PROCESS = 'ADD_PROCESS'
export const DEL_PROCESS = 'DEL_PROCESS'
export const SET_PROCESS = 'SET_PROCESS'
export const SET_PROCESSES = 'SET_PROCESSES'

interface AddProcessAction {
    type: typeof ADD_PROCESS
    payload: Process
}

interface RemoveProcessAction {
    type: typeof DEL_PROCESS
    payload: number
}

interface SetProcessAction {
    type: typeof SET_PROCESS
    payload: Process
}

interface SetProcessesAction {
    type: typeof SET_PROCESSES
    payload: Process[]
}

export type RamActionTypes = AddProcessAction | RemoveProcessAction | SetProcessAction | SetProcessesAction