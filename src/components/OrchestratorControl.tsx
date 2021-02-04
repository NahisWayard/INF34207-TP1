import React from 'react';
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";

function OrchestratorControl () {
    return (
        <div>

            <Row>
                <Col md={3}>
                    <h2>Orchestrator control</h2>
                </Col>
                <Col md={2}>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control as="select" custom>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={1}>
                    <ButtonGroup>
                        <Button variant="success">Start</Button>
                        <Button variant="danger">Stop</Button>
                        <Button variant="warning">Reset</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
    )
}

export default OrchestratorControl;