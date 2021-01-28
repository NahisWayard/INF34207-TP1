import {ADD_PROCESS, DEL_PROCESS, RamActionTypes, RamState} from './types'

const initialState: RamState = {
    processes: []
}

export function ramReducer(
    state = initialState,
    action: RamActionTypes
): RamState {
    switch (action.type) {
        case ADD_PROCESS:
            return {
                processes: [...state.processes, action.payload]
            }
        case DEL_PROCESS:
            state.processes.splice(action.payload, 1);
            return {
                processes: [...state.processes]
            }
        default:
            return state
    }
}