import IStrategy from "./IStrategy";

export default class ExampleStrategy implements IStrategy {
    getName(): string {
        return "Example Strategy";
    }
}