import { ramReducer } from './process/reducers'
import { combineReducers, createStore } from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import {barrierReducer} from "./barrier/reducers";

const rootReducer = combineReducers({
    ram: ramReducer,
    barriers: barrierReducer
})

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, composeWithDevTools());