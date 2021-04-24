import React from 'react';
import { Card, ListGroup, ListGroupItem, Form} from "react-bootstrap";
import {RootState} from "../store";
import {Process} from "../store/process/types";
//import { BarrierState } from '../store/barrier/types';
import {useDispatch, useSelector} from "react-redux";
import {toggleProcessBarrier} from "../store/barrier/actions";


interface ProcessProps {
    processId: number,
    process: Process,
    barrierId : number,
    isDisabled : boolean
}

// interface BarrierProps {
//     barrierList : BarrierState,
// }

function BarrierItem(props: ProcessProps){

    // bar[i] -> barrière id
    // bar[i][j] -> process id
    // bar[i][j][k] -> thread id 
    
    const dispatch = useDispatch();
    const barriers = useSelector(((state: RootState) => state.barriers)).barriers;
    // React.ChangeEvent<HTMLInputElement>
    const changeHandler = (e: any) => { // TODO: Type à changer

        if (barriers[props.barrierId][props.processId] === undefined){
            console.log("a inserer");
            dispatch(toggleProcessBarrier(props.barrierId, props.processId, parseInt(e.target.getAttribute('data-threadid'))));
            console.log(barriers);
            return;
        }

        for (let i = 0; i < barriers[props.barrierId][props.processId].length; i++){
            if (barriers[props.barrierId][props.processId][i] === e.target.getAttribute('data-threadid')){
                console.log("a supprimer"); // Pas de suppression pour le moment
                return;
            }
        }
        console.log("a inserer");
        dispatch(toggleProcessBarrier(props.barrierId, props.processId, parseInt(e.target.getAttribute('data-threadid'))));
        console.log(barriers[props.barrierId]);

        //dispatch(toggleProcessBarrier(props.barrierId, props.processId, e.target.getAttribute('data-threadid')))
        /*console.log("Je suis processID -> " + e.target.getAttribute('data-processid'))
        console.log("Je suis ThreadID -> " + e.target.getAttribute('data-threadid'))
        console.log(e.target.value);*/
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