import React from 'react';
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {ListGroup, Col, Row, Button} from "react-bootstrap";
import {removeBarrier} from "../store/barrier/actions";
import BarrierItem from './BarrierItem';
import {updateProcesses} from "../store/process/actions";
import {Trash} from "react-bootstrap-icons";

interface BarrierProps {
    barrierId : number,
    isDisabled : boolean
}

function BarrierList(props: BarrierProps){
    
    const ram = useSelector((state: RootState) => state.ram);
    const dispatch = useDispatch();
    const barriers = useSelector(((state: RootState) => state.barriers)).barriers;
    const barrierItems = ram.processes.map((p, idx) => <BarrierItem key={idx} processId={idx} process={p} barrierId={props.barrierId} isDisabled={props.isDisabled}/>);

    const RemoveBarrier = () => {
        let tmp = ram.processes;

        for (let i = 0; i < tmp.length; i++) {
            for (let j = 0; j < tmp[i].operations.length; j++) {
                for (let z = 0; z < tmp[i].operations[j].length; z++){
                    if (tmp[i].operations[j][z].type === (0 - (props.barrierId + 1))) {
                        tmp[i].operations[j].splice(z, 1);
                    }
                }
            }
        }
        //setDisableBarrier(false);
        dispatch(updateProcesses(tmp))
        console.log(ram.processes);

        dispatch(removeBarrier(props.barrierId));
        console.log(barriers);
    }
    
    return (
        <>
            <br/>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <h3>Barrières {props.barrierId+1}<Button onClick={RemoveBarrier} variant={"danger"}><Trash/></Button></h3>
                </Col>
                <Col md={1}></Col>   
            </Row>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <ListGroup horizontal={true}>
                        {barrierItems}
                    </ListGroup> 
                </Col>
                <Col md={1}></Col>   
            </Row>
            <br />
        </>
    )
}

export default BarrierList;