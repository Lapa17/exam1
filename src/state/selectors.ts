import {AppStoreType} from "./store";


export const selectStartValue = (state: AppStoreType) => state.memory.startValue
export const selectMaxValue = (state: AppStoreType) => state.memory.maxValue
export const selectCounterValue = (state: AppStoreType) => state.memory.counter

