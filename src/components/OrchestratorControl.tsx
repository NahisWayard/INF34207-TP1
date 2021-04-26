import React, {memo, useState} from 'react';
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import Strategies from "../strategies";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getMemoryInUse, getProcessesTotalMemory, updateProcesses} from "../store/process/actions";
import {OperationStatus, Process, ProcessStatus} from "../store/process/types";
import { toast } from 'react-toastify';

function OrchestratorControl () {
    const [disableStart, setDisableStart] = useState(false);
    const [disableStop, setDisableStop] = useState(true);
    const [disableReset, setDisableReset] = useState(true);
    const [disableMemory, setDisableMemory] = useState(false);

    const [memory, setMemory] = useState(16);
    const [selectedStrategy, setSelectedStrategy] = useState(Strategies[0]);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

    const dispatch = useDispatch();
    const processes = useSelector((state: RootState) => state.ram.processes);

    const processNext = (ps: Process[]) => {
        const ret = selectedStrategy.process(ps, memory);

        dispatch(updateProcesses(ret.ps));
        if (ret.wait === -1) {
            setDisableStop(true);
            setTimer(undefined);
            toast("Simulation ended", {
                type: "success",
                position: "bottom-right"
            });
            return;
        }
        setTimer(setTimeout(() => {
            processNext(ps);
        }, ret.wait));
    }

    const handleStart = () => {
        setDisableStart(true);
        setDisableStop(false);
        setDisableReset(false);
        setDisableMemory(true);
        processNext(processes);
    }

    const handleStop = () => {
        setDisableStart(false);
        setDisableStop(true);
        setDisableReset(false);

        if (timer !== undefined) {
            clearTimeout(timer);
            setTimer(undefined);
        }
    }

    const handleReset = () => {
        handleStop();
        const np = processes.map((p) => {
            p.status = ProcessStatus.NEW;
            for (let i in p.operations) {
                for (let j in p.operations[i]) {
                    p.operations[i][j].status = OperationStatus.IDLE;
                }
            }
            return (p);
        })
        setDisableReset(true);
        setTimer(undefined);
        setDisableMemory(false);
        dispatch(updateProcesses(np));
    }

    const handleChangeStrategy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStrategy(Strategies[Number(e.target.selectedOptions[0].value)])
    }

    const strategiesAsOptions = Strategies.map((s, idx) => <option key={idx} value={idx}>{s.getName()}</option>)
    const memoryUsed = getProcessesTotalMemory(processes);

    return (
        <div style={{marginTop: "4%"}}>
            <br/>
            <Row>
                <Col md={1}></Col>
                <Col md={3}>
                    <h2>Politique d'ordonnancement</h2>
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
                <Col md={2}>
                    <Row>
                        <Col md={6}>
                            Memory available (ko)
                        </Col>
                        <Col md={6}>
                            <Form.Control type="text" value={memory} onChange={(e) => {
                                let val = parseInt(e.target.value);

                                if (!isNaN(val))
                                    setMemory(val);
                                else
                                    setMemory(0);
                            }} placeholder="Mémoire disponible (Mb)" name="memory" disabled={disableMemory} required/>
                        </Col>
                        <Col md={6}>
                            Memory in use (ko)
                        </Col>
                        <Col md={6}>
                            <Form.Control type="text" value={memoryUsed} name="memory" disabled={true} required/>
                        </Col>
                    </Row>
                </Col>
                <Col md={1}>
                    <ButtonGroup>
                        <Button variant="success" onClick={handleStart} disabled={disableStart}>Start</Button>
                        <Button variant="danger" onClick={handleStop} disabled={disableStop}>Stop</Button>
                        <Button variant="warning" onClick={handleReset} disabled={disableReset}>Reset</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
    )
}

export default OrchestratorControl;