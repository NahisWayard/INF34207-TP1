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
            return {
                barriers: [...state.barriers, {}]
            }
        case DEL_BARRIER:
            state.barriers.splice(action.payload, 1);
            return state;
        case TOGGLE_PROCESS_BARRIER:
            const barriers = state.barriers;
            if (barriers[action.payload.barrierId] === undefined)
                return state;
            if (barriers[action.payload.barrierId][action.payload.processId] === undefined) {
                barriers[action.payload.barrierId][action.payload.processId] = [];
            }
            const idx = barriers[action.payload.barrierId][action.payload.processId].indexOf(action.payload.threadId);
            if (idx != -1) {
                const array = barriers[action.payload.barrierId][action.payload.processId];
                array.splice(idx, 1);
                console.log(action.payload, array);
                barriers[action.payload.barrierId][action.payload.processId] = array;
            } else {
                barriers[action.payload.barrierId][action.payload.processId].push(action.payload.threadId);
            }
            return {
                barriers: barriers
            }
        default:
            return state
    }
}