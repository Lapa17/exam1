import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';




const App = () => {
  const [number, setNumber] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [startValue, setStartValue] = useState(0)
  const [editMode, setEditMode] = useState<boolean>(false)


  useEffect(() => {
    let startValueAsStr = localStorage.getItem('startValue')
    if (startValueAsStr) {
      let newStartValue = JSON.parse(startValueAsStr)
      setNumber(newStartValue)
      setStartValue(newStartValue)
    }

  }, [])
  useEffect(() => {
    let maxValueAsStr = localStorage.getItem('maxValue')
    if (maxValueAsStr) {
      let newMaxValue = JSON.parse(maxValueAsStr)
      setMaxValue(newMaxValue)
    }

  }, [])



  const onIncClcikHandler = () => setNumber(number + 1)
  const onResetHandler = () => setNumber(startValue)
  const onSetHandler = () => {
    localStorage.setItem('maxValue', JSON.stringify(maxValue))
    localStorage.setItem('startValue', JSON.stringify(startValue))
    setNumber(startValue)
    setEditMode(false)
  }


  const setDisabled = startValue < 0 || maxValue <= startValue || !editMode ? true : false
  const incDisabled = number < maxValue && editMode === false ? false : true
  const restDisabled = number > startValue && editMode === false ? false : true
  const divCounter = incDisabled ? 'red counter' : 'counter'
  const spanClass = setDisabled ? 'red counter' : 'counter'
  const inputMaxValueClass = maxValue <= startValue ? 'redInput input' : 'input'
  const inputStartValueClass = startValue < 0 || startValue >= maxValue ? 'redInput input' : 'input'


  const spanTitle = setDisabled ? 'Warning' : 'Some text'


  let onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(JSON.parse(e.currentTarget.value))
    setEditMode(true)
  }
  let onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartValue(JSON.parse(e.currentTarget.value))
    setEditMode(true)
  }


  return (
    <div>
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
        <span>Max value</span>
        <Input value={maxValue} changeHandler={onChangeMaxValueHandler} InputClass={inputMaxValueClass} />
        <span>start value</span>
        <Input value={startValue} changeHandler={onChangeStartValueHandler} InputClass={inputStartValueClass} />
        <div className={'btnWrapper'}>
          <Button onClick={onSetHandler} name={'set'} disabled={setDisabled} />

        </div>
      </div>
    </div>
  );
}

export default App;

type InputPropsType = {
  value: number
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  InputClass: string
}

const Input = (props: InputPropsType) => {

  return (
    <input type="number" value={props.value} onChange={props.changeHandler} className={props.InputClass} />
  )
}