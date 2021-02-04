import React from 'react';
import {Operation, OperationType} from "../store/process/types";
import {ListGroup, ListGroupItem} from "react-bootstrap";

interface ThreadProps {
    operations: Operation[]
}

function ThreadItem(props: ThreadProps) {
    return (
        <ListGroupItem>
            <ListGroup>
                {props.operations.map((op, idx) => <div key={idx}>{op.type === OperationType.CALC ? "Calc" : "I/O"}</div>)}
            </ListGroup>
        </ListGroupItem>
    )
}

export default ThreadItem;