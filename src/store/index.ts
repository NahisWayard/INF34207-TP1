import { ramReducer } from './process/reducers'
import { combineReducers, createStore } from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    ram: ramReducer
})

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, composeWithDevTools());