import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import {useDispatch, useSelector} from "react-redux";
import {selectCounterValue, selectMaxValue, selectStartValue} from "./state/selectors";
import {memoryTypeAction, setCounterValue, setMaxValue, setStartValue} from "./state/memory-reducer";


const App = () => {

    const startValue = useSelector(selectStartValue)
    const maxValue = useSelector(selectMaxValue)
    const counterValue = useSelector(selectCounterValue)

    const dispatch = useDispatch<Dispatch<memoryTypeAction>>()

    const [editMode, setEditMode] = useState<boolean>(false)


    useEffect(() => {
    let startValueAsStr = localStorage.getItem('startValue')
    if (startValueAsStr) {
      let newStartValue = JSON.parse(startValueAsStr)
      dispatch(setStartValue(newStartValue))
    }
    let maxValueAsStr = localStorage.getItem('maxValue')
    if (maxValueAsStr) {
      let newMaxValue = JSON.parse(maxValueAsStr)
      dispatch(setMaxValue(newMaxValue))
    }
    let counterValueAsStr = localStorage.getItem('counterValue')
    if (counterValueAsStr) {
      let newCounterValueAsStr = JSON.parse(counterValueAsStr)
      dispatch(setCounterValue(newCounterValueAsStr))
    }
  
  }, [])
  

    const onIncClickHandler = () => {
      dispatch(setCounterValue(counterValue + 1))
      localStorage.setItem('counterValue', JSON.stringify(counterValue + 1))
    }
    const onResetHandler = () => dispatch(setCounterValue(startValue))
    const onSetHandler = () => {
        dispatch(setCounterValue(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('counterValue', JSON.stringify(startValue))
        setEditMode(false)
    }


    const setDisabled = startValue < 0 || maxValue <= startValue || !editMode
    const incDisabled = !(counterValue < maxValue && !editMode)
    const restDisabled = !(counterValue > startValue && !editMode)
    const divCounter = incDisabled ? 'red counter' : 'counter'
    const spanClass = setDisabled ? 'red message' : 'message'
    const inputMaxValueClass = maxValue <= startValue ? 'redInput input' : 'input'
    const inputStartValueClass = startValue < 0 || startValue >= maxValue ? 'redInput input' : 'input'


    const spanTitle = setDisabled ? 'invalid value!' : "enter value and press 'set'"


    let onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxValue(JSON.parse(e.currentTarget.value)))
        setEditMode(true)
    }
    let onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setStartValue(JSON.parse(e.currentTarget.value)))
        setEditMode(true)
    }


    return (
        <div className={'mainWrapper'}>
            <div className={'wrapper'}>
                {editMode ?
                    <span className={spanClass}>{spanTitle}</span>
                    : <div className={divCounter}>{counterValue}</div>
                }
                <div className={'btnWrapper'}>
                    <Button onClick={onIncClickHandler} name={'inc'} disabled={incDisabled}/>
                    <Button onClick={onResetHandler} name={'reset'} disabled={restDisabled}/>

                </div>
            </div>
            <div className={'wrapper'}>
                <div className={'wrapperBorder'}>
                    <div className={'itemWrapper'}>
                        <span>max value:</span>
                        <Input value={maxValue} changeHandler={onChangeMaxValueHandler}
                               InputClass={inputMaxValueClass}/>
                    </div>
                    <div className={'itemWrapper'}>
                        <span>start value:</span>
                        <Input value={startValue} changeHandler={onChangeStartValueHandler}
                               InputClass={inputStartValueClass}/>
                    </div>
                </div>
                <div className={'btnWrapper set'}>
                    <Button onClick={onSetHandler} name={'set'} disabled={setDisabled}/>

                </div>
            </div>
        </div>
    );
}

export default App;

