import {ADD_PROCESS, DEL_PROCESS, Process, RamActionTypes, SET_PROCESS, SET_PROCESSES} from './types'

export function removeProcess(processId: number): RamActionTypes {
    return {
        type: DEL_PROCESS,
        payload: processId
    }
}


export function addProcess(newProcess: Process): RamActionTypes {
    return {
        type: ADD_PROCESS,
        payload: newProcess
    }
}

export function updateProcess(process: Process): RamActionTypes {
    return {
        type: SET_PROCESS,
        payload: process
    }
}

export function updateProcesses(processes: Process[]): RamActionTypes {
    return {
        type: SET_PROCESSES,
        payload: processes
    }
}