import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import {useDispatch, useSelector} from "react-redux";
import {selectMaxValue, selectStartValue} from "./state/selectors";
import {memoryTypeAction, setValues} from "./state/memory-reducer";




const App = () => {

  const selectedStartValue = useSelector(selectStartValue)
  const selectedMaxValue = useSelector(selectMaxValue)

  const dispatch = useDispatch<Dispatch<memoryTypeAction>>()

  const [number, setNumber] = useState(0)
  const [maxValue, setMaxValue] = useState(selectedMaxValue)
  const [startValue, setStartValue] = useState(selectedStartValue)
  const [editMode, setEditMode] = useState<boolean>(false)



  // useEffect(() => {
  //   let startValueAsStr = localStorage.getItem('startValue')
  //   if (startValueAsStr) {
  //     let newStartValue = JSON.parse(startValueAsStr)
  //     setNumber(newStartValue)
  //     setStartValue(newStartValue)
  //   }
  //
  // }, [])
  // useEffect(() => {
  //   let maxValueAsStr = localStorage.getItem('maxValue')
  //   if (maxValueAsStr) {
  //     let newMaxValue = JSON.parse(maxValueAsStr)
  //     setMaxValue(newMaxValue)
  //   }
  //
  // }, [])




  const onIncClcikHandler = () => setNumber(number + 1)
  const onResetHandler = () => setNumber(startValue)
  const onSetHandler = () => {
    dispatch(setValues(startValue,maxValue))
    setNumber(startValue)
    setEditMode(false)
  }


  const setDisabled = startValue < 0 || maxValue <= startValue || !editMode ? true : false
  const incDisabled = number < maxValue && editMode === false ? false : true
  const restDisabled = number > startValue && editMode === false ? false : true
  const divCounter = incDisabled ? 'red counter' : 'counter'
  const spanClass = setDisabled ? 'red message' : 'message'
  const inputMaxValueClass = maxValue <= startValue ? 'redInput input' : 'input'
  const inputStartValueClass = startValue < 0 || startValue >= maxValue ? 'redInput input' : 'input'


  const spanTitle = setDisabled ? 'invalid value!' : "enter value and press 'set'"


  let onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(JSON.parse(e.currentTarget.value))
    setEditMode(true)
  }
  let onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartValue(JSON.parse(e.currentTarget.value))
    setEditMode(true)
  }


  return (
    <div className={'mainWrapper'}>
      <div className={'wrapper'}>
        {editMode ?
          <span className={spanClass}>{spanTitle}</span>
          : <div className={divCounter}>{number}</div>
        }
        <div className={'btnWrapper'}>
          <Button onClick={onIncClcikHandler} name={'inc'} disabled={incDisabled} />
          <Button onClick={onResetHandler} name={'reset'} disabled={restDisabled} />

        </div>
      </div>
      <div className={'wrapper'}>
        <div className={'wrapperBorder'}>
          <div className={'itemWrapper'}>
            <span>max value:</span>
            <Input value={maxValue} changeHandler={onChangeMaxValueHandler} InputClass={inputMaxValueClass} />
          </div>
          <div className={'itemWrapper'}>
            <span>start value:</span>
            <Input value={startValue} changeHandler={onChangeStartValueHandler} InputClass={inputStartValueClass} />
          </div>
        </div>
        <div className={'btnWrapper set'}>
          <Button onClick={onSetHandler} name={'set'} disabled={setDisabled} />

        </div>
      </div>
    </div>
  );
}

export default App;

