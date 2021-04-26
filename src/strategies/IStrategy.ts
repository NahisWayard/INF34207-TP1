import {OperationStatus, OperationType, Process, ProcessStatus} from "../store/process/types";
import {getMemoryInUse} from "../store/process/actions";

export interface StrategyControl {
    ps: Process[]
    wait: number
}

export default abstract class AStrategy {
    abstract getName(): string

    protected abstract run(ps: Process[], id: number): StrategyControl
    protected abstract getNextPID(ps: Process[]) : number

    protected endPreviousOperation(ps: Process[]) : Process[] {
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

    protected execOperation(ps: Process[], id: number): StrategyControl {
        ps[id].status = ProcessStatus.RUNNING;
        for (let i = 0; i < ps[id].operations.length; i++) { //Thread loop
            for (let j = 0; j < ps[id].operations[i].length; j++) { //Operation loop
                if (ps[id].operations[i][j].status === 0) {
                    ps[id].operations[i][j].status = OperationStatus.RUNNING;

                    let waitSec = 0;
                    switch (ps[id].operations[i][j].type) {
                        case OperationType.CALC:
                            waitSec = 1;
                            break;
                        case OperationType.INPUT_OUTPUT:
                            waitSec = 3;
                            break;
                        default:
                            waitSec = 0.1;
                    }

                    return {
                        wait: 1000 * waitSec,
                        ps: ps
                    }
                }
            }
        }
        return {
            wait: -1,
            ps: ps
        }
    }

    process(ps: Process[], memoryAvailable: number): StrategyControl {
        ps = this.endPreviousOperation(ps);
        let id = this.getNextPID(ps);
        let recheckSwap = false;

        while (recheckSwap || getMemoryInUse(ps) >= memoryAvailable) {
            let toSwapId = this.findToSwap(ps, id);
            recheckSwap = false;

            if (toSwapId < 0)
                break;
            ps[toSwapId].status = ProcessStatus.SWAPPED;

            if (!recheckSwap && ps[id].status == ProcessStatus.SWAPPED) {
                ps[id].status = ProcessStatus.NEW;
                recheckSwap = true;
            }
        }
        if (id === -1) {
            return {ps: ps, wait: -1}
        }
        return this.run(ps, id);
    }

    private findToSwap(ps: Process[], toNotSwap: number) : number {
        for (let id = 0; id < ps.length; id++) {
            if (id == toNotSwap || ps[id].status == ProcessStatus.SWAPPED || ps[id].status == ProcessStatus.RUNNING)
                continue;
            else
                return id;
        }
        return -1;
    }
}