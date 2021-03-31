import React from 'react';
import { Card, ListGroup, ListGroupItem, Form} from "react-bootstrap";
import {Process} from "../store/process/types";
import { BarrierState } from '../store/barrier/types';


interface ProcessProps {
    processId: number,
    process: Process
}

interface BarrierProps {
    barrierList : BarrierState
}

function BarrierItem(props: ProcessProps){


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { // TODO: Type à changer
        console.log("Je suis processID -> " + e.target.getAttribute('data-processid'))
        console.log("Je suis ThreadID -> " + e.target.getAttribute('data-threadid'))
    }

    return (
        <>
            <ListGroupItem>
            <Card>
                <Card.Header>
                    <h2>{props.process.name}</h2>
                    <div>PID: {props.processId}</div>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        {props.process.operations.map((op, index) => {
                            let tmp = "Thread "+index                        
                            return (
                                <Form key={index}>
                                    <Form.Check type="checkbox" label={tmp} data-processid={props.processId} data-threadid={index} onChange={changeHandler}/>
                                </Form>
                            )
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
            </ListGroupItem>
        </>
    )
}

export default BarrierItem;