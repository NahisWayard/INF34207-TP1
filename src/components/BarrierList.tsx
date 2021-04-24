import React from 'react';
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {ListGroup, Col, Row, Button} from "react-bootstrap";
import {removeBarrier} from "../store/barrier/actions";
import BarrierItem from './BarrierItem';
//import {addBarrier, removeBarrier, toggleProcessBarrier} from "../store/barrier/actions";

interface BarrierProps {
    barrierId : number,
    isDisabled : boolean
}

function BarrierList(props: BarrierProps){
    
    const ram = useSelector((state: RootState) => state.ram);
    const dispatch = useDispatch();
    const barriers = useSelector(((state: RootState) => state.barriers)).barriers;
    const barrierItems = ram.processes.map((p, idx) => <BarrierItem key={idx} processId={idx} process={p} barrierId={props.barrierId} isDisabled={props.isDisabled}/>);

    // const testAddBarrier = () => {
    //     dispatch(addBarrier());
    //     console.log(barriers);
    // }

    // const testRemoveBarrier = () => {
    //     dispatch(removeBarrier(barriers.length - 1));
    // }

    // const testToggleBarrier = () => {
    //     dispatch(toggleProcessBarrier(0, 1, 3));
    //     dispatch(toggleProcessBarrier(0, 1, 1));
    // }

    const RemoveBarrier = () => {
        dispatch(removeBarrier(props.barrierId)); // pb un la fonction removeBarrier
        console.log(barriers);
    }
    
    const ReinitializeBarrier = () => {
        //let tmp = ram.processes;
        console.log(barriers);
    }


    return (
        <>
            <br/>
            <br/>
            {/* <Button onClick={testAddBarrier}>Test add 1</Button>
            <Button onClick={testRemoveBarrier}>Test remove last</Button>
            <Button onClick={testToggleBarrier}>Test toggle</Button>
            <Button onClick={testUpdateProcessBarrier}>Test update barrier</Button> */}
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <h3>Barrières {props.barrierId}</h3>
                </Col>
                <Col md={1}></Col>   
            </Row>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <Button onClick={RemoveBarrier} disabled>Remove Barriere</Button>
                    <Button onClick={ReinitializeBarrier} disabled>Reinitialize</Button>
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