import React from 'react';
import {OperationType} from "../store/process/types";
import {ListGroup, ListGroupItem} from "react-bootstrap";

interface ThreadProps {
    operations: OperationType[]
}

function ThreadItem(props: ThreadProps) {
    return (
        <ListGroupItem>
            <ListGroup>
                {props.operations.map(op => <div>{op === OperationType.Calc ? "Calc" : "I/O"}</div>)}
            </ListGroup>
        </ListGroupItem>
    )
}

export default ThreadItem;