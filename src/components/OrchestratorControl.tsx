import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import Strategies from "../strategies";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {updateProcesses} from "../store/process/actions";
import {OperationStatus, Process, ProcessStatus} from "../store/process/types";


function OrchestratorControl () {
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
    const [running, setRunning] = useState<boolean>(false);
    const [selectedStrategy, setSelectedStrategy] = useState(Strategies[0]);

    const dispatch = useDispatch();
    const processes = useSelector((state: RootState) => state.ram.processes);

    const processNext = (ps: Process[]) => {
        const ret = selectedStrategy.run(ps);

        dispatch(updateProcesses(ret.ps));
        if (ret.wait === -1) {
            setRunning(false);
            return;
        }
        setTimer(setTimeout(() => {
            processNext(ps);
        }, 1000));
    }

    const handleStart = () => {
        setTimer(setTimeout(() => {
            processNext(processes);
        }, 1000));
        setRunning(true);
    }

    const handleStop = () => {
        setRunning(false);
        if (timer !== undefined)
            clearTimeout(timer);
    }

    const handleReset = () => {
        handleStop();
        setTimer(undefined);
        const np = processes.map((p) => {
            p.status = ProcessStatus.NEW;
            for (let i in p.operations) {
                for (let j in p.operations[i]) {
                    p.operations[i][j].status = OperationStatus.IDLE;
                }
            }
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
                    <Button variant="success" onClick={handleStart} disabled={timer !== undefined}>Start</Button>
                    <Button variant="danger" onClick={handleStop} disabled={timer === undefined || running === false}>Stop</Button>
                    <Button variant="warning" onClick={handleReset} disabled={timer === undefined}>Reset</Button>
                </ButtonGroup>
            </Col>
        </Row>
    )
}

export default OrchestratorControl;