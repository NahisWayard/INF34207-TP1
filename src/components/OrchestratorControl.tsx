import React, {useState} from 'react';
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import Strategies from "../strategies";

function OrchestratorControl () {
    const [selectedStrategy, setSelectedStrategy] = useState(Strategies[0]);

    const handleStart = () => {
        console.log(selectedStrategy.getName());
    }

    const handleStop = () => {
    }

    const handleReset = () => {
    }

    const handleChangeStrategy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStrategy(Strategies[Number(e.target.selectedOptions[0].value)])
    }

    const strategiesAsOptions = Strategies.map((s, idx) => <option value={idx}>{s.getName()}</option>)

    return (
        <Row>
            <Col md={3}>
                <h2>Orchestrator control</h2>
            </Col>
            <Col md={2}>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control as="select" custom onChange={handleChangeStrategy}>
                            {strategiesAsOptions}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Col>
            <Col md={1}>
                <ButtonGroup>
                    <Button variant="success" onClick={handleStart}>Start</Button>
                    <Button variant="danger" onClick={handleStop}>Stop</Button>
                    <Button variant="warning" onClick={handleReset}>Reset</Button>
                </ButtonGroup>
            </Col>
        </Row>
    )
}

export default OrchestratorControl;