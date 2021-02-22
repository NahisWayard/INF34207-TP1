import React from 'react';
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {Process} from "../store/process/types";
import {useDispatch} from "react-redux";
import {removeProcess} from "../store/process/actions";
import {Trash} from "react-bootstrap-icons";
import ThreadItem from "./ThreadItem";

interface ProcessProps {
    processId: number,
    process: Process
}

function ProcessItemList(props: ProcessProps) {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(removeProcess(props.processId))
    }

    const threadList = props.process.operations.map((p, idx) => <ThreadItem key={idx} operations={p} />);

    return (
        <ListGroupItem>
            <Card>
                <Card.Header>
                    <h2>{props.process.name}  <Button onClick={deleteHandler} variant={"danger"} className="float-right"><Trash/></Button></h2>
                    <div>PID: {props.processId}</div>
                    <div>Priorité: {props.process.priority}</div>
                    <div>Durée: {props.process.time}</div>
                    <div>Status: {props.process.status}</div>
                </Card.Header>
                <Card.Body>
                    <ListGroup horizontal>
                        {threadList}
                    </ListGroup>
                </Card.Body>
            </Card>
        </ListGroupItem>
    )
}

export default ProcessItemList;