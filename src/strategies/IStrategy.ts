import {OperationStatus, OperationType, Process, ProcessStatus} from "../store/process/types";
import {getMemoryInUse} from "../store/process/actions";

export interface StrategyControl {
    ps: Process[]
    wait: number
}

export default abstract class AStrategy {
    abstract getName(): string

    protected abstract run(ps: Process[], id: number): StrategyControl
    protected abstract getNextPID(ps: Process[]): number

    protected endPreviousOperation(ps: Process[]) : Process[] {
        for (let id = 0; id < ps.length; id++) {
            if (ps[id].status !== ProcessStatus.RUNNING)
                continue;
            threadLoop:
            for (let i = 0; i < ps[id].operations.length; i++)
                for (let j = 0; j < ps[id].operations[i].length; j++) {
                    if (ps[id].operations[i][j].status === OperationStatus.RUNNING) {
                        if (ps[id].operations[i][j].type >= 0) {
                            ps[id].operations[i][j].status = OperationStatus.DONE
                        } else {
                            ps = AStrategy.checkUnlockBarriers(ps, ps[id].operations[i][j].type);
                            break threadLoop;
                        }

                        if (i === ps[id].operations.length - 1 && j === ps[id].operations[i].length - 1)
                            ps[id].status = ProcessStatus.TERMINATED;
                    }
                }
        }
        return ps;
    }

    private static checkUnlockBarriers(ps: Process[], type: OperationType) : Process[] {
        let barriersOp = ps.map(p => p.operations.map(t => t.filter(o => o.type === type))).flat(2);

        if (barriersOp.length !== barriersOp.filter(o => o.status === OperationStatus.RUNNING).length)
            return ps;

        for (let id = 0; id < ps.length; id++) {
            for (let i = 0; i < ps[id].operations.length; i++)
                for (let j = 0; j < ps[id].operations[i].length; j++) {
                    if (ps[id].operations[i][j].type === type) {
                        ps[id].operations[i][j].status = OperationStatus.DONE;
                    }
                }
        }
        return ps;
    }

    protected execOperation(ps: Process[], id: number): StrategyControl {
        ps[id].status = ProcessStatus.RUNNING;
        threadLoop:
        for (let i = 0; i < ps[id].operations.length; i++) {
            for (let j = 0; j < ps[id].operations[i].length; j++) {
                if (ps[id].operations[i][j].type < 0 && ps[id].operations[i][j].status === OperationStatus.RUNNING) {
                    continue threadLoop;
                }
                if (ps[id].operations[i][j].status === OperationStatus.IDLE) {
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
        let id = this.getRunnablePID(ps);

        if (id === -1) {
            console.log("No runnable PID");
            return {ps: ps, wait: -1}
        }

        let recheckSwap = false;

        while (recheckSwap || getMemoryInUse(ps) >= memoryAvailable) {
            let toSwapId = AStrategy.findToSwap(ps, id);
            recheckSwap = false;

            if (toSwapId < 0)
                break;
            ps[toSwapId].status = ProcessStatus.SWAPPED;

            if (!recheckSwap && ps[id].status === ProcessStatus.SWAPPED) {
                ps[id].status = ProcessStatus.NEW;
                recheckSwap = true;
            }
        }

        if (id === -1)
            return {ps: ps, wait: -1}
        return this.run(ps, id);
    }

    private getRunnablePID(ps: Process[]) : number {
        let cleanedPs = ps.filter((p, i, a) => AStrategy.checkCanRunPID(a, i));
        let cleanedId = this.getNextPID(cleanedPs);

        return ps.indexOf(cleanedPs[cleanedId]);
    }

    private static checkCanRunPID(ps: Process[], id: number) : boolean {
        for (let i = 0; i < ps[id].operations.length; i++) {
            let firstOperation = ps[id].operations[i].filter(o => o.status !== OperationStatus.DONE)[0];

            if (firstOperation === undefined)
                continue;
            if (firstOperation.status === OperationStatus.IDLE)
                return true;
        }
        return false;
    }

    private static findToSwap(ps: Process[], toNotSwap: number) : number {
        for (let id = 0; id < ps.length; id++) {
            if (id === toNotSwap || ps[id].status === ProcessStatus.SWAPPED || ps[id].status === ProcessStatus.RUNNING)
                continue;
            else
                return id;
        }
        return -1;
    }
}