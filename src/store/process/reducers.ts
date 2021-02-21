import {
    ADD_PROCESS,
    DEL_PROCESS,
    OperationStatus,
    OperationType,
    ProcessStatus,
    RamActionTypes,
    RamState,
    SET_PROCESS,
    SET_PROCESSES
} from './types'

export function defaultOperation(type: OperationType) {
    return {
        status: OperationStatus.IDLE,
        type: type
    }
    
}

const initialState: RamState = {
    processes: [
        {
            name: "Process 1",
            threadCount: 1,
            priority: 1,
            status: ProcessStatus.NEW,
            operations: [
                [defaultOperation(OperationType.INPUT_OUTPUT), defaultOperation(OperationType.CALC), defaultOperation(OperationType.INPUT_OUTPUT)]
            ],
            time: 7
        },
        {
            name: "Process 2",
            threadCount: 2,
            priority: 100,
            status: ProcessStatus.NEW,
            operations: [
                [defaultOperation(OperationType.INPUT_OUTPUT), defaultOperation(OperationType.CALC), defaultOperation(OperationType.INPUT_OUTPUT)],
                [defaultOperation(OperationType.INPUT_OUTPUT), defaultOperation(OperationType.CALC), defaultOperation(OperationType.INPUT_OUTPUT)]
            ],
            time: 14
        },
        {
            name: "Process 3",
            threadCount: 3,
            priority: 10,
            status: ProcessStatus.NEW,
            operations: [
                [defaultOperation(OperationType.INPUT_OUTPUT), defaultOperation(OperationType.CALC), defaultOperation(OperationType.INPUT_OUTPUT)],
                [defaultOperation(OperationType.INPUT_OUTPUT), defaultOperation(OperationType.CALC), defaultOperation(OperationType.INPUT_OUTPUT)],
                [defaultOperation(OperationType.INPUT_OUTPUT), defaultOperation(OperationType.CALC), defaultOperation(OperationType.INPUT_OUTPUT)]
            ],
            time: 21
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
        case SET_PROCESS:
            const idx = state.processes.findIndex((k) => {
                return k.name === action.payload.name
            });
            const arr = state.processes;
            arr[idx] = action.payload;
            return {
                processes: [...arr]
            }
        case SET_PROCESSES:
            return {
                processes: action.payload
            }
        default:
            return state
    }
}