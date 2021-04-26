import {ADD_PROCESS, DEL_PROCESS, Process, ProcessStatus, RamActionTypes, SET_PROCESS, SET_PROCESSES} from './types'

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

export function getMemoryInUse(p: Process[]) {
    return p.reduce(
        (s, i) => {
            if (i.status == ProcessStatus.SWAPPED || i.status == ProcessStatus.TERMINATED)
                return s;
            return s + i.operations.reduce(
                (s, i) => s + i.filter(x => x.type >= 0).length, 0)
        }, 0);
}

export function getProcessesTotalMemory(p: Process[]) {
    return p.reduce(
        (s, i) => {
            if (i.status == ProcessStatus.TERMINATED)
                return s;
            return s + i.operations.reduce(
                (s, i) => s + i.filter(x => x.type >= 0).length, 0)
        }, 0);
}