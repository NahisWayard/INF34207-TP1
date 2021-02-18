import {Process} from "../store/process/types";

export interface StrategyControl {
    ps: Process[]
    wait: number
}

export default abstract class AStrategy {
    abstract getName(): string

    protected abstract run(ps: Process[], id: number): StrategyControl
    protected abstract getNextPID(ps: Process[]) : number
    protected abstract endPreviousOperation(ps: Process[]) : Process[]

    process(ps: Process[]): StrategyControl {
        ps = this.endPreviousOperation(ps);
        let id = this.getNextPID(ps);

        if (id === -1) {
            console.log("Orchestration ended");
            return {ps: ps, wait: -1}
        }
        return this.run(ps, id);
    }
}