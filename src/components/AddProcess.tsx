import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addProcess} from "../store/process/actions";
import {defaultOperation} from "../store/process/reducers";
import {Operation, OperationType, Process, ProcessStatus} from "../store/process/types";

function defineNonDivisibleNb(val: number, divise: number){
    let tmp = val;

    if (val % divise !== 0) {
        while (tmp % divise !== 0) {
            tmp = tmp - 1
        }
        return (val - tmp)
    }
    return 0
}

function insertInOperation(tmp: Operation[], type: OperationType, limit: number){
    for (let a = 0; a < limit; a++){
        tmp.push(defaultOperation(type))
    }
}

function shakeOperation(tabOp : Operation[], limit : number) {

    let tmpOp = defaultOperation(OperationType.CALC);
    let randPlace  = Math.floor(Math.random() * (limit));

    for (let i = 0; i < limit; i++) {
        tmpOp = tabOp[randPlace]
        tabOp[randPlace] = tabOp[i];
        tabOp[i] = tmpOp
        randPlace  = Math.floor(Math.random() * (limit));
    }
}

function dispatchOperations(p : Process, calcNb : number, IONb : number) {

    let tmpOperation = [] as Operation[]

    const nbCalcIsDivisible = defineNonDivisibleNb(calcNb, p.threadCount)
    const nbIOIsDivisible = defineNonDivisibleNb(IONb, p.threadCount)
    const calcLimit = (calcNb - nbCalcIsDivisible) / p.threadCount;
    const IOLimit = (IONb - nbIOIsDivisible) / p.threadCount;

    for (let i = 0; i < p.threadCount; i++){
            
        if (i === p.threadCount - 1 && nbCalcIsDivisible !== 0) {
            insertInOperation(tmpOperation, OperationType.CALC, calcLimit + nbCalcIsDivisible);
        } else {
            insertInOperation(tmpOperation, OperationType.CALC, calcLimit);
        }
        
        if (i === p.threadCount - 1 && nbIOIsDivisible !== 0) {
            insertInOperation(tmpOperation, OperationType.INPUT_OUTPUT, IOLimit + nbIOIsDivisible);
        } else { 
            insertInOperation(tmpOperation, OperationType.INPUT_OUTPUT, IOLimit);
        }

        shakeOperation(tmpOperation, tmpOperation.length)
        p.operations.push(tmpOperation);

        tmpOperation = []
    }
}

function AddProcess() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const clickHandler = (e: any) => { // TODO: Type à changer
        
        e.preventDefault();
        
        const p : Process = {
            name: e.target.ProcessName.value,
            status: ProcessStatus.NEW,
            threadCount: e.target.NbThread.value,
            priority: e.target.Priority.value,
            operations : [] as Operation[][],
            time : parseInt(e.target.NbCalc.value) + (parseInt(e.target.NbInOut.value) * 3)
        }

        if (e.target.NbThread.value === "Entre 1 et 3") {
            p.threadCount = Math.floor(Math.random() * (3)) + 1;
        }
        
        dispatchOperations(p, e.target.NbCalc.value, e.target.NbInOut.value)
        dispatch(addProcess(p))
        
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Ajouter un processus
            </Button>

            <Modal size="lg" show={show} onHide={handleClose} centered>
                <Form onSubmit={clickHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un processus</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group as={Row}>
                            <Form.Label column sm={4} >Nom du processus</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" placeholder="Nom du processus" name="ProcessName" required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4} >Priorité</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" min="1" defaultValue="1" placeholder="Priorité" name="Priority" required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4} >Nombre d'instructions de calcul</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" min="0" defaultValue="1" placeholder="Nombre d'instructions de calcul" name="NbCalc" required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4} >Nombre d'E/S</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" min="0" defaultValue="1" placeholder="Nombre d'entrée sortie" name="NbInOut" required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                            <Form.Label column sm={4} >Nombre de Thread</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="select" name="NbThread">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>Entre 1 et 3</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                        <Button type="submit" variant="primary">
                            Sauvegarder
                        </Button>
                    </Modal.Footer>
                </Form>                            
            </Modal>
        </>
    )
}

export default AddProcess;