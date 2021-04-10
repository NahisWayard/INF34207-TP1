import React from 'react';
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {ListGroup, ListGroupItem, Col, Row, Button} from "react-bootstrap";
import BarrierItem from './BarrierItem';
import {addBarrier, removeBarrier, toggleProcessBarrier} from "../store/barrier/actions";

function BarrierList(){
    
    const ram = useSelector((state: RootState) => state.ram);
    const dispatch = useDispatch();
    const barriers = useSelector(((state: RootState) => state.barriers)).barriers;
    const barrierItems = ram.processes.map((p, idx) => <BarrierItem key={idx} processId={idx} process={p} />);

    const testAddBarrier = () => {
        dispatch(addBarrier());
    }

    const testRemoveBarrier = () => {
        dispatch(removeBarrier(barriers.length - 1));
    }

    const testToggleBarrier = () => {
        //dispatch(toggleProcessBarrier(0, 0, 0));
        //dispatch(toggleProcessBarrier(0, 0, 1));
        dispatch(toggleProcessBarrier(0, 1, 3));
        dispatch(toggleProcessBarrier(0, 1, 1));
    }

    return (
        <>
            <br/>
            <br/>
            <Button onClick={testAddBarrier}>Test add 1</Button>
            <Button onClick={testRemoveBarrier}>Test remove last</Button>
            <Button onClick={testToggleBarrier}>Test toggle</Button>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <h3>Barrières</h3>
                </Col>
                <Col md={1}></Col>   
            </Row>
            <br/>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <ListGroup horizontal={true}>
                        {barrierItems}
                        <ListGroupItem>Barrière 1</ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={1}></Col>   
            </Row>
            <br />

        </>
    )
}

export default BarrierList;