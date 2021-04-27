import React, {useState} from 'react';
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {addBarrier} from "../store/barrier/actions";
import {updateProcesses} from "../store/process/actions";
import {Process} from "../store/process/types";
import { Barriers } from '../store/barrier/types';
import BarrierList from './BarrierList';
import {Operation} from "../store/process/types";

// interface BarrierProps {
//     barrierList : BarrierState,
//     barrierId : number,
// }

function BarrierManager(){
    const ram = useSelector((state: RootState) => state.ram);
    const dispatch = useDispatch();
    const barriers = useSelector(((state: RootState) => state.barriers)).barriers;
    const [disableBarrier, setDisableBarrier] = useState(false);
    const barrierLists = barriers.map((p, idx) => <BarrierList key={idx} barrierId={idx} isDisabled={disableBarrier}/>);

    function updateProcessBarrier(processlist : Process[], bar : Barriers[]) {

        //let randTmp = 0; 

        // bar[i] -> barrière id
        // bar[i][j] -> process id
        // bar[i][j][k] -> thread id 
        for (let i = 0; i < bar.length; i++) {  // parcour des barrières
            let tmp : Operation = {
                type: 0,
                status: 0
            };
            //tmp.type = 0;
            tmp.type = tmp.type - (i+1);
            for (let t in bar[i]) {   //  parcour des process de la barrière
                for (let j = 0; j < bar[i][t].length; j++){     // parcour des threads des process de la barrière
                    processlist[t].operations[bar[i][t][j]].unshift(tmp)
                    // randTmp = Math.floor(Math.random() * (processlist[t].operations[t].length));
                    // if (processlist[t].operations[bar[i][t][j]][randTmp].type < 0) {
                    //     while (processlist[t].operations[bar[i][t][j]][randTmp].type < 0) {
                    //         randTmp = Math.floor(Math.random() * (processlist[t].operations[t].length)); 
                    //     }
                    // }
                    // if (processlist[t].operations[bar[i][t][j]][randTmp].type >= 0) {
                    //     if (processlist[t].operations[bar[i][t][j]][randTmp].type > 0) {
                    //         processlist[t].operations[bar[i][t][j]][randTmp].type = 0;
                    //     }
                    //     processlist[t].operations[bar[i][t][j]][randTmp].type -= i+1;
                    // }

                }
            }
        }
    } 

    const UpdateProcessBarrier = () => { // Met a jour les process avec les barrieres
        let tmp = ram.processes;
        updateProcessBarrier(tmp, barriers);
        dispatch(updateProcesses(tmp))
        console.log(ram.processes);
        setDisableBarrier(true);
    }

    const AddBarrier = () => {
        dispatch(addBarrier());
        console.log(barriers);
    }

    const ReinitiatilizeBarrier = () => {
        let tmp = ram.processes;

        for (let i = 0; i < tmp.length; i++) {
            for (let j = 0; j < tmp[i].operations.length; j++) {
                for (let z = 0; z < tmp[i].operations[j].length; z++){
                    if (tmp[i].operations[j][z].type < 0) {
                        tmp[i].operations[j].splice(z, 1);
                    }
                }
            }
        }
        setDisableBarrier(false);
        dispatch(updateProcesses(tmp))
        console.log(ram.processes);

        // for (let i = 0; i < barriers.length; i++) { // supprime toutes les barrieres
        //     dispatch(removeBarrier(i));
        // }
    }

    return (
        <>
            <div>
                {barrierLists}
            </div>
            { disableBarrier
            ?   <>
                    <Button onClick={AddBarrier} disabled>Add Barriere</Button>
                    <Button onClick={ReinitiatilizeBarrier} >Reinitialize Barriere</Button>
                    <Button onClick={UpdateProcessBarrier} disabled>Update Processes</Button>
                </>
            :    
                <>
                    <Button onClick={AddBarrier}>Add Barriere</Button>
                    <Button onClick={ReinitiatilizeBarrier} >Reinitialize Barriere</Button>
                    <Button onClick={UpdateProcessBarrier}>Update Processes</Button>
                </>
            }
        </>
    )
}

export default BarrierManager;