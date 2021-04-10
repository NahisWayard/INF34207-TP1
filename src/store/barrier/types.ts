export interface Barriers {
    [key: number]: number[]
}

export interface BarrierState {
    barriers: Barriers[]
}

export const ADD_BARRIER = 'ADD_BARRIER'
export const DEL_BARRIER = 'DEL_BARRIER'
export const TOGGLE_PROCESS_BARRIER = 'TOGGLE_PROCESS_BARRIER'

interface AddBarrierAction {
    type: typeof ADD_BARRIER
}

interface RemoveBarrierAction {
    type: typeof DEL_BARRIER
    payload: number
}

interface ToggleProcessBarrierAction {
    type: typeof TOGGLE_PROCESS_BARRIER
    payload: {
        barrierId: number,
        processId: number,
        threadId: number
    }
}

export type BarrierActionTypes = AddBarrierAction | RemoveBarrierAction | ToggleProcessBarrierAction