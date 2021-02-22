import React from 'react';
import {ListGroup, Row, Col} from 'react-bootstrap';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import ProcessListItem from "./ProcessListItem";

function ProcessList () {
    const ram = useSelector((state: RootState) => state.ram);
    const processesItems = ram.processes.map((p, idx) => <ProcessListItem key={idx} processId={idx} process={p} />);

    return (
        <div>
            <br/>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <h3>Liste des processus</h3>
                </Col>
                <Col md={1}></Col>   
            </Row>
            <br />
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <ListGroup horizontal={true}>
                        {processesItems}
                    </ListGroup>
                </Col>
                <Col md={1}></Col>
            </Row>
        </div>
    )
}

export default ProcessList;