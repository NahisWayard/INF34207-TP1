import React from 'react';
import {ListGroup} from "react-bootstrap";
import {Process} from "../store/process/types";
import {useDispatch} from "react-redux";
import {removeProcess} from "../store/process/actions";

interface ProcessProps {
    processId: number,
    process: Process
}

function ProcessItemList(props: ProcessProps) {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(removeProcess(props.processId))
    }

    return (
        <ListGroup.Item onClick={clickHandler}>
            {props.processId}
        </ListGroup.Item>
    )
}

export default ProcessItemList;