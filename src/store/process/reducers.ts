import {
    ADD_PROCESS,
    DEL_PROCESS,
    Operation,
    OperationStatus,
    OperationType,
    ProcessStatus,
    RamActionTypes,
    RamState
} from './types'

export const defaultIOOperation: Operation = {
    status: OperationStatus.IDLE,
    type: OperationType.INPUT_OUTPUT
}
export const defaultCalcOperation: Operation = {
    status: OperationStatus.IDLE,
    type: OperationType.CALC
}

const initialState: RamState = {
    processes: [
        {
            name: "Process 1",
            threadCount: 1,
            priority: 1,
            status: ProcessStatus.NEW,
            operations: [
                [defaultIOOperation, defaultCalcOperation, defaultIOOperation]
            ]
        },
        {
            name: "Process 2",
            threadCount: 2,
            priority: 100,
            status: ProcessStatus.NEW,
            operations: [
                [defaultIOOperation, defaultCalcOperation, defaultIOOperation],
                [defaultIOOperation, defaultCalcOperation, defaultIOOperation]
            ]
        },
        {
            name: "Process 3",
            threadCount: 3,
            priority: 10,
            status: ProcessStatus.NEW,
            operations: [
                [defaultIOOperation, defaultCalcOperation, defaultIOOperation],
                [defaultIOOperation, defaultCalcOperation, defaultIOOperation],
                [defaultIOOperation, defaultCalcOperation, defaultIOOperation]
            ]
        }
    ]
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