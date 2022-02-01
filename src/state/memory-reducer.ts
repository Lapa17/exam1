const SET_VALUES = 'SET_VALUES'

export type memoryTypeAction = {
    type: typeof SET_VALUES
    startValue: number
    maxValue: number
}

export type memoryType = {
    startValue: number
    maxValue: number
}

const initState: memoryType = {
    startValue: 0,
    maxValue: 0
};

export const memoryReducer = (state = initState, action: memoryTypeAction): memoryType => {
    switch (action.type) {
        case SET_VALUES: {
            return {...state, startValue:action.startValue, maxValue:action.maxValue};
        }
        default:
            return state;
    }
};

export const setValues = (startValue: number, maxValue: number) => ({type: SET_VALUES, startValue,maxValue }) as const;