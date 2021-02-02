import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {addProcess} from "../store/process/actions";
import {OperationType} from "../store/process/types";

function AddProcess() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const clickHandler = (e: any) => { // Type à changer
        
        e.preventDefault();
        
        const p = {
            name: e.target.ProcessName.value,
            primaryKey: 1,
            threadCount: e.target.NbThread.value,
            priority: e.target.Priority.value,
            operations: [
                [OperationType.InputOutput, OperationType.Calc, OperationType.InputOutput]
            ]
        }

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
                                    <Form.Control type="number" placeholder="Priorité" name="Priority" required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={4} >Nombre d'E/S</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="number" placeholder="Nombre d'entrée sortie" name="NbInOut" required/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={4} >Nombre de calculs</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="number" placeholder="Nombre de calcule" name="NbCalc" required/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                <Form.Label column sm={4} >Nombre de Thread</Form.Label>
                                <Col sm={8}>
                                    <Form.Control as="select" name="NbThread">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
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