import {ADD_PROCESS, DEL_PROCESS, Process, RamActionTypes} from './types'

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