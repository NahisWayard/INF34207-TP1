import {Process} from "../store/process/types";

export default interface IStrategy {
    getName(): string
    run(ps: Process[]): any
}