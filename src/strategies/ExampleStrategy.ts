import IStrategy from "./IStrategy";
import {Process, ProcessStatus} from "../store/process/types";

export default class ExampleStrategy implements IStrategy {

    getName(): string {
        return "Example Strategy";
    }

    run(ps: Process[]): any {
        for (let i = 0; i < ps.length; i++) {
            if (ps[i].status === ProcessStatus.NEW) {
                ps[i].status = ProcessStatus.RUNNING;
                break;
            } else if (ps[i].status === ProcessStatus.RUNNING) {
                break;
            }
        }
        return {
            ps: ps,
            wait: 1000
        };
    }
}