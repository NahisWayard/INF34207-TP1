import AStrategy, {StrategyControl} from "./IStrategy";
import {OperationStatus, Process, ProcessStatus} from "../store/process/types";

export default class ExampleStrategy extends AStrategy {
    getName(): string {
        return "Example Strategy";
    }

    protected getNextPID(ps: Process[]): number {
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

    run(ps: Process[], id: number): StrategyControl {
        return this.execOperation(ps, id);
    }
}