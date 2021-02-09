import IStrategy from "./IStrategy";
import {useDispatch} from "react-redux";

export default class ExampleStrategy implements IStrategy {
    getName(): string {
        return "Example Strategy";
    }

    run(): void{
        //const dispatch = useDispatch();
    }
}