import {combineReducers, createStore} from 'redux';
import {memoryReducer} from "./memory-reducer";

const reducers = combineReducers({
    memory: memoryReducer,

})

const store = createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
