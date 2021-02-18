import AStrategy, {StrategyControl} from "./IStrategy";
import {Process} from "../store/process/types";

export default class PriorityStrategy extends AStrategy {
    getName(): string {
        return "Par priorité sans famine";
    }

    protected getNextPID(ps: Process[]): number {
        return 0;
    }

    protected endPreviousOperation(ps: Process[]): Process[] {
        return [];
    }

    protected run(ps: Process[], id: number): StrategyControl {
        return {
            ps: [],
            wait: -1
        };
    }
}
