import {ADD_PROCESS, DEL_PROCESS, OperationType, RamActionTypes, RamState} from './types'

const initialState: RamState = {
    processes: [
        {
            name: "Process 1",
            threadCount: 1,
            priority: 1,
            operations: [
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput]
            ]
        },
        {
            name: "Process 2",
            threadCount: 2,
            priority: 100,
            operations: [
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput],
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput]
            ]
        },
        {
            name: "Process 3",
            threadCount: 3,
            priority: 10,
            operations: [
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput],
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput],
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput]
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