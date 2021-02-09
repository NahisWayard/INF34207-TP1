import React, {useState} from 'react';
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import Strategies from "../strategies";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {updateProcess, updateProcesses} from "../store/process/actions";
import {Process, ProcessStatus} from "../store/process/types";

function OrchestratorControl () {
    const [selectedStrategy, setSelectedStrategy] = useState(Strategies[0]);
    const dispatch = useDispatch();
    const processes = useSelector((state: RootState) => state.ram.processes);

    const processNext = (ps: Process[], i: number) => {
        if (i >= ps.length)
            return;
        ps[i].status = ProcessStatus.RUNNING;
        dispatch(updateProcess(ps[i]));
        setTimeout(() => {
            processNext(ps, i + 1);
        }, 1000);
    }

    const handleStart = () => {
        setTimeout(() => {
            processNext(processes, 0);
        }, 1000);
    }

    const handleStop = () => {
    }

    const handleReset = () => {
        handleStop();
        const np = processes.map((p) => {
            p.status = ProcessStatus.NEW;
            return (p);
        })
        dispatch(updateProcesses(np));
    }

    const handleChangeStrategy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStrategy(Strategies[Number(e.target.selectedOptions[0].value)])
    }

    const strategiesAsOptions = Strategies.map((s, idx) => <option key={idx} value={idx}>{s.getName()}</option>)

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