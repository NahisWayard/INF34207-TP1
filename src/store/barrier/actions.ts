import {ADD_BARRIER, BarrierActionTypes, DEL_BARRIER, TOGGLE_PROCESS_BARRIER} from "./types";

export function removeBarrier(barrierId: number): BarrierActionTypes {
    return {
        type: DEL_BARRIER,
        payload: barrierId
    }
}


export function addBarrier(): BarrierActionTypes {
    return {
        type: ADD_BARRIER,
    }
}

export function toggleProcessBarrier(barrierId: number, processId: number) : BarrierActionTypes {
    return {
        type: TOGGLE_PROCESS_BARRIER,
        payload: {
            barrierId: barrierId,
            processId: processId
        }
    }
}