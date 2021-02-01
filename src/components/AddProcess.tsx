import {Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {addProcess} from "../store/process/actions";
import {OperationType} from "../store/process/types";

function AddProcess() {
    const dispatch = useDispatch();

    const clickHandler = () => {
        const p = {
            name: "Example process",
            primaryKey: 1,
            threadCount: 1,
            priority: 1,
            operations: [
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput]
            ]
        }
        dispatch(addProcess(p))
    }

    return (
        <div>
            <Button onClick={clickHandler}>Add process</Button>
        </div>
    )
}

export default AddProcess;