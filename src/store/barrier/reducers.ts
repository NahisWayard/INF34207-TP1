import {
    ADD_BARRIER,
    BarrierActionTypes,
    BarrierState,
    DEL_BARRIER,
    TOGGLE_PROCESS_BARRIER
} from './types'

const initialState: BarrierState = {
    barriers: []
}

export function barrierReducer(
    state = initialState,
    action: BarrierActionTypes
): BarrierState {
    switch (action.type) {
        case ADD_BARRIER:
            return state
        case DEL_BARRIER:
            return state
        case TOGGLE_PROCESS_BARRIER:
            return state
        default:
            return state
    }
}