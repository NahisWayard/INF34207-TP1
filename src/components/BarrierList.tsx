import React from 'react';
import {RootState} from "../store";
import {useSelector} from "react-redux";
import {ListGroup, ListGroupItem, Col, Row} from "react-bootstrap";
import BarrierItem from './BarrierItem';

function BarrierList(){
    
    const ram = useSelector((state: RootState) => state.ram);
    const barrierItems = ram.processes.map((p, idx) => <BarrierItem key={idx} processId={idx} process={p} />);

    return (
        <>
            <br/>
            <br/>
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