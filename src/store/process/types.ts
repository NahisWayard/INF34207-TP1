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
    NEW,
    READY,
    RUNNING,
    WAITING,
    TERMINATED
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

interface AddProcessAction {
    type: typeof ADD_PROCESS
    payload: Process
}

interface RemoveProcessAction {
    type: typeof DEL_PROCESS
    payload: number
}

export type RamActionTypes = AddProcessAction | RemoveProcessAction