import {Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {addProcess} from "../store/process/actions";

function AddProcess() {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addProcess({}))
    }

    return (
        <div>
            <Button onClick={clickHandler}>Add process</Button>
        </div>
    )
}

export default AddProcess;