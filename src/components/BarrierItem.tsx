import React from 'react';
import { Card, ListGroup, ListGroupItem, Form} from "react-bootstrap";
import {RootState} from "../store";
import {Process} from "../store/process/types";
import {Operation} from "../store/process/types";
//import { BarrierState } from '../store/barrier/types';
import {updateProcesses} from "../store/process/actions";
import {useDispatch, useSelector} from "react-redux";
import {toggleProcessBarrier} from "../store/barrier/actions";


interface ProcessProps {
    processId: number,
    process: Process,
    barrierId : number,
    isDisabled : boolean
}

function BarrierItem(props: ProcessProps){

    // bar[i] -> barrière id
    // bar[i][j] -> process id
    // bar[i][j][k] -> thread id 
    
    const ram = useSelector((state: RootState) => state.ram);
    const dispatch = useDispatch();
    const barriers = useSelector(((state: RootState) => state.barriers)).barriers;
    // React.ChangeEvent<HTMLInputElement>

    function isBarrierExist(processID : number, threadID : number,  barrierTag : number){
        for (let i = 0; i < ram.processes[processID].operations[threadID].length; i++){
            if (ram.processes[processID].operations[threadID][i].type === barrierTag) {
                return i;
            }
        }
        return -1;
    }

    function updateProcessBarrier(processlist : Process[], processID : number, threadID : number, barrierId : number) {
        // bar[i] -> barrière id
        // bar[i][j] -> process id
        // bar[i][j][k] -> thread id 

        let tmp : Operation = {
            type: 0,
            status: 0
        };
        tmp.type = tmp.type - (barrierId+1);

        let bIdx = isBarrierExist(processID, threadID, tmp.type);

        if (bIdx != -1) {
            processlist[processID].operations[threadID].splice(bIdx, 1);
        } else {
            //processlist[processID].operations[threadID].unshift(tmp);
            processlist[processID].operations[threadID].splice(Math.floor(Math.random() * (processlist[processID].operations[threadID].length)), 0, tmp);
        }
        return 
    }

    const changeHandler = (e: any) => { // TODO: Type à changer

        let tmp = ram.processes;
        const threadId = parseInt(e.target.getAttribute('data-threadid'));

        if (barriers[props.barrierId][props.processId] === undefined){
            dispatch(toggleProcessBarrier(props.barrierId, props.processId, threadId));
            updateProcessBarrier(tmp, props.processId, threadId, props.barrierId);
            dispatch(updateProcesses(tmp))
            return;
        }

        for (let i = 0; i < barriers[props.barrierId][props.processId].length; i++){
            if (barriers[props.barrierId][props.processId][i] === threadId){
                updateProcessBarrier(tmp, props.processId, threadId, props.barrierId);
                dispatch(updateProcesses(tmp))
                dispatch(toggleProcessBarrier(props.barrierId, props.processId, threadId));
                return;
            }
        }

        dispatch(toggleProcessBarrier(props.barrierId, props.processId, threadId));
        updateProcessBarrier(tmp, props.processId, threadId, props.barrierId);
        dispatch(updateProcesses(tmp))
        return;
    }

    function isThreadInBarrierProcess(tr : number){
        if (barriers[props.barrierId][props.processId] === undefined){
            return false;
        }
        for (let i = 0; i < barriers[props.barrierId][props.processId].length; i++){
            if (barriers[props.barrierId][props.processId][i] === tr) {
                return true;
            }
        }
        return false;
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
                            let tmp = "Thread "+index;
                            if (props.isDisabled === true) {
                                if (isThreadInBarrierProcess(index)){
                                    return (
                                        <Form key={index}>
                                            <Form.Check type="checkbox" defaultChecked={true} label={tmp} data-processid={props.processId} data-threadid={index} onChange={changeHandler} disabled/>
                                        </Form>
                                    )
                                } else {
                                    return (
                                        <Form key={index}>
                                            <Form.Check type="checkbox" label={tmp} data-processid={props.processId} data-threadid={index} onChange={changeHandler} disabled/>
                                        </Form>
                                    )
                                }                                   
                            }
                            if (isThreadInBarrierProcess(index)){
                                return (
                                    <Form key={index}>
                                        <Form.Check type="checkbox" defaultChecked={true} label={tmp} data-processid={props.processId} data-threadid={index} onChange={changeHandler}/>
                                    </Form>
                                )
                            } else {
                                return (
                                    <Form key={index}>
                                        <Form.Check type="checkbox" label={tmp} data-processid={props.processId} data-threadid={index} onChange={changeHandler}/>
                                    </Form>
                                )
                            }         
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
            </ListGroupItem>
        </>
    )
}

export default BarrierItem;