import React, {useState} from 'react';
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Row,} from "react-bootstrap";
import {addBarrier} from "../store/barrier/actions";
import BarrierList from './BarrierList';

function BarrierManager(){
    const dispatch = useDispatch();
    const barriers = useSelector(((state: RootState) => state.barriers)).barriers;
    const [disableBarrier, setDisableBarrier] = useState(false);
    const barrierLists = barriers.map((p, idx) => <BarrierList key={idx} barrierId={idx} isDisabled={disableBarrier}/>);

    const AddBarrier = () => {
        dispatch(addBarrier());
        console.log(barriers);
    }

    return (
        <>
            <br />
            <br />
            <br />
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                { disableBarrier
                    ?   <>
                            <Button onClick={AddBarrier} disabled>Nouvelle Barrière</Button>
                        </>
                    :    
                        <>
                            <Button onClick={AddBarrier}>Nouvelle Barrière</Button>
                        </>
                }
                </Col>
                <Col md={1}></Col>
            </Row>
            <div>
                {barrierLists}
            </div>
        </>
    )
}

export default BarrierManager;