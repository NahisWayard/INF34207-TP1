import AStrategy, {StrategyControl} from "./IStrategy";
import {OperationStatus, Process, ProcessStatus} from "../store/process/types";

export default class PriorityStrategy extends AStrategy {
    getName(): string {
        return "Par priorité sans famine";
    }

    protected getNextPID(ps: Process[]): number {
        let sortedId = -1;
        let tmpPs = [...ps];

        tmpPs.sort(((a, b) => {
            return b.priority - a.priority
        }));

        psLoop:
        for (let id = 0; id < ps.length; id++) {
            if (tmpPs[id].status === ProcessStatus.NEW) {
                sortedId = id;
                break;
            }
            if (tmpPs[id].status === ProcessStatus.TERMINATED)
                continue;
            for (let i = 0; i < tmpPs[id].operations.length; i++) {
                for (let j = 0; j < tmpPs[id].operations[i].length; j++) {
                    if (tmpPs[id].operations[i][j].status === OperationStatus.IDLE) {
                        sortedId = id;
                        break psLoop;
                    }
                }
            }
        }
        return ps.indexOf(tmpPs[sortedId]);
    }

    protected run(ps: Process[], id: number): StrategyControl {
        let control = this.execOperation(ps, id);

        if (control.ps[id].priority > 1)
            control.ps[id].priority--;
        return control;
    }
}
