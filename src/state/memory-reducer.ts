const SET_START_VALUE = 'SET_START_VALUE'
const SET_MAX_VALUE = 'SET_MAX_VALUE'
const SET_COUNTER_VALUE = 'SET_COUNTER_VALUE'

export type memoryTypeAction = setStartValueTypeAction | setMaxValueTypeAction | setCounterValueTypeAction

export type setStartValueTypeAction = {
    type: typeof SET_START_VALUE
    startValue: number
}

export type setMaxValueTypeAction = {
    type: typeof SET_MAX_VALUE
    maxValue: number
}

export type setCounterValueTypeAction = {
    type: typeof SET_COUNTER_VALUE
    counter: number
}


export type memoryType = {
    startValue: number
    maxValue: number
    counter: number
}

const initState: memoryType = {
    startValue: 0,
    maxValue: 0,
    counter: 0,
};

export const memoryReducer = (state = initState, action: memoryTypeAction): memoryType => {
    switch (action.type) {
        case SET_START_VALUE: {
            return {...state, startValue: action.startValue};
        }
        case SET_MAX_VALUE: {
            return {...state, maxValue: action.maxValue};
        }
        case SET_COUNTER_VALUE: {
            return {...state, counter: action.counter};
        }
        default:
            return state;
    }
};

export const setStartValue = (startValue: number) => ({type: SET_START_VALUE, startValue}) as const;
export const setMaxValue = (maxValue: number) => ({type: SET_MAX_VALUE, maxValue}) as const;
export const setCounterValue = (counter: number) => ({type: SET_COUNTER_VALUE, counter}) as const;