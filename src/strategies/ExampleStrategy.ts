import IStrategy from "./IStrategy";
import {OperationStatus, OperationType, Process, ProcessStatus} from "../store/process/types";

export default class ExampleStrategy implements IStrategy {

    getName(): string {
        return "Example Strategy";
    }

    private static endPreviousOperation(ps: Process[]) : Process[] {
        for (let id = 0; id < ps.length; id++) {
            if (ps[id].status !== ProcessStatus.RUNNING)
                continue;
            for (let i = 0; i < ps[id].operations.length; i++)
                for (let j = 0; j < ps[id].operations[i].length; j++) {
                    if (ps[id].operations[i][j].status === OperationStatus.RUNNING) {
                        ps[id].operations[i][j].status = OperationStatus.DONE;

                        if (i === ps[id].operations.length - 1 && j === ps[id].operations[i].length - 1)
                            ps[id].status = ProcessStatus.TERMINATED;
                    }
                }
        }
        return ps;
    }

    private static getNextPID(ps: Process[]) : number {
        for (let id = 0; id < ps.length; id++) {
            if (ps[id].status === ProcessStatus.NEW)
                return id;
            if (ps[id].status === ProcessStatus.TERMINATED)
                continue;
            for (let i = 0; i < ps[id].operations.length; i++) {
                for (let j = 0; j < ps[id].operations[i].length; j++) {
                    if (ps[id].operations[i][j].status === OperationStatus.IDLE) {
                        return id;
                    }
                }
            }
        }
        return -1;
    }

    run(ps: Process[]): any {
        ps = ExampleStrategy.endPreviousOperation(ps);

        let turnDone = false;
        let waitTime = -1;
        let id = ExampleStrategy.getNextPID(ps);

        if (id === -1) {
            console.log("Orchestration ended");
            return {ps: ps, wait: -1}
        }


        ps[id].status = ProcessStatus.RUNNING;
        for (let i = 0; i < ps[id].operations.length && !turnDone; i++) { //Thread loop
            for (let j = 0; j < ps[id].operations[i].length && !turnDone; j++) { //Operation loop
                if (ps[id].operations[i][j].status === 0) {
                    ps[id].operations[i][j].status = OperationStatus.RUNNING
                    turnDone = true;
                    waitTime = 1000 * ((ps[id].operations[i][j].type === OperationType.CALC) ? 1 : 3)
                }
            }
        }
        console.log(waitTime);
        return {
            ps: ps,
            wait: waitTime
        };
    }
}