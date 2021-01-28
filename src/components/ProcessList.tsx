import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {ListGroup} from "react-bootstrap";
import ProcessListItem from "./ProcessListItem";

function ProcessList () {
    const processes = useSelector((state: RootState) => state.ram.processes);
    const processesItems = processes.map((p, idx) => <ProcessListItem key={idx} processId={idx} process={p} />);

    return (
        <div>
            <h3>Process ID list</h3>
            <ListGroup horizontal>
                {processesItems}
            </ListGroup>
        </div>
    )
}

export default ProcessList;