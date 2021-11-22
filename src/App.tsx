import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';




const App = () => {
  let [number, setNumber] = useState(0)
  let [maxValue, setMaxValue] = useState(0)
  let [startValue, setStartValue] = useState(0)

  let mxValue = maxValue
  let mxValueAsStr = localStorage.getItem('maxValue')
  if (mxValueAsStr) {
     mxValue = JSON.parse(mxValueAsStr)
  }

  let beginValue = startValue
  let beginValueAsStr = localStorage.getItem('startValue')
  if (beginValueAsStr) {
    beginValue = JSON.parse(beginValueAsStr)
  }


  useEffect(() => {
    localStorage.setItem('counterValue', JSON.stringify(number))
  }, [number])

  useEffect(() => {
    setNumber(startValue)
  }, [beginValue])


  const onIncClcikHandler = () => setNumber(number+1)
  const onResetHandler = () => setNumber(beginValue)
  const onSetHandler = () => {
    localStorage.setItem('maxValue', JSON.stringify(maxValue))
    localStorage.setItem('startValue', JSON.stringify(startValue))
    setNumber(beginValue)
  }

  

  const incDisabled = number < mxValue ? false : true
  const restDisabled = number > beginValue ? false : true
  const divCounter = incDisabled ? 'red counter' : 'counter'

  let onChangeMaxValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setMaxValue(JSON.parse(e.currentTarget.value))
  }
  let onChangeStartValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setStartValue(JSON.parse(e.currentTarget.value))
  }


  return (
    <div>
      <div className={'wrapper'}>
        <div className={divCounter}>{number}</div>
        <div className={'btnWrapper'}>
          <Button onClick={onIncClcikHandler} name={'inc'} disabled={incDisabled} />
          <Button onClick={onResetHandler} name={'reset'} disabled={restDisabled} />

        </div>
      </div>
      <div className={'wrapper'}>
        <span>Max value</span>
        <Input value={maxValue} changeHandler={onChangeMaxValueHandler}/>
        <span>start value</span>
        <Input value={startValue} changeHandler={onChangeStartValueHandler}/>
        <div className={'btnWrapper'}>
          <Button onClick={onSetHandler} name={'set'} disabled={false} />

        </div>
      </div>
    </div>
  );
}

export default App;

type InputPropsType = {
  value: number
  changeHandler:(e:ChangeEvent<HTMLInputElement>)=> void
}

const Input = (props: InputPropsType) => {

  return (
    <input type="number" value={props.value} onChange={props.changeHandler} />
  )
}