import React from 'react';
import {Operation, OperationStatus, OperationType} from "../store/process/types";
import {Button, ButtonGroup, ListGroupItem} from "react-bootstrap";
import {ButtonVariant} from "react-bootstrap/types";

interface ThreadProps {
    operations: Operation[]
}

function ThreadItem(props: ThreadProps) {
    const threadStyle = {
        padding: '0'
    }
    return (
        <ListGroupItem style={threadStyle}>
            <ButtonGroup vertical>
                {props.operations.map((op, idx) => {
                    let variant: ButtonVariant = "primary";

                    switch (op.status) {
                        case OperationStatus.DONE:
                            variant = "success"
                            break;
                        case OperationStatus.IDLE:
                            variant = ""
                            break;
                        case OperationStatus.RUNNING:
                            variant = "warning"
                    }
                    return <Button key={idx} variant={variant}>{op.type === OperationType.CALC ? "Calc" : "I/O"}</Button>
                })}
            </ButtonGroup>
        </ListGroupItem>
    )
}

export default ThreadItem;