import AStrategy, {StrategyControl} from "./IStrategy";
import {OperationType, Process, ProcessStatus} from "../store/process/types";

export default class PCAStrategy extends AStrategy {
    getName(): string {
        return "Plus Court d'Abord";
    }

    getProcessTime(ps: Process[]): number[] {
        let tmpTime = 0;
        let time = [] as number[];

        for (let i = 0; i < ps.length; i++) {
            for (let a = 0; a < ps[i].threadCount; a++){
                for (let b = 0; b < ps[i].operations[a].length; b++){
                    if (ps[i].operations[a][b].type === OperationType.CALC){
                        tmpTime++;
                    } else if (ps[i].operations[a][b].type === OperationType.INPUT_OUTPUT) {
                        tmpTime += 3;
                    }
                }
            }
            time.push(tmpTime);
            tmpTime = 0;
        }
        return time
    }

    protected getNextPID(ps: Process[]): number {
        let nextPID = 0;
        let tmpTime = [...ps];

        tmpTime.sort((a,b) => a.time - b.time);

        for (let i = 0; i < tmpTime.length; i++){
            nextPID = ps.indexOf(tmpTime[i])
            if (ps[nextPID].status === ProcessStatus.NEW || ps[nextPID].status === ProcessStatus.RUNNING) {
                return nextPID;
            }
        }
        return nextPID;
    }
    
    protected run(ps: Process[], id: number): StrategyControl {
        let control = this.execOperation(ps, id);
        return control;
    }
}
